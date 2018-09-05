import React, { PureComponent } from 'react';

import styles from './HomePage.scss';
import {
    Upload, Icon, Card,
    Row, Col,
} from '../components/antd';
import CheckboxGroupGrid from '../components/CheckboxGroupGrid';
import TableProcesses from '../components/TableProcesses';
import Process from '../utils/Process';
import { arrayPush } from '../utils/arrays';
import { isOS } from '../utils/platform';
import { formatBytes } from '../utils/formatter';

const { Dragger } = Upload;

const ACCEPT_FILES = 'image/png,image/jpg,image/jpeg,image/gif,image/svg,image/svg+xml';

const JPG_OPTIONS = [
    { value: 'jpegoptim', label: 'jpegoptim' },
    { value: 'jpegtran', label: 'jpegtran' },
    { value: 'mozjpeg', label: 'mozjpeg' },
];

const PNG_OPTIONS = [
    { value: 'advpng', label: 'advpng' },
    { value: 'optipng', label: 'optipng' },
    { value: 'pngcrush', label: 'pngcrush' },
    { value: 'pngout', label: 'pngout' },
    { value: 'zopfli', label: 'zopfli' },
];

const SVG_OPTIONS = [
    { value: 'svgo', label: 'svgo' },
];

const supportGiflossy = isOS([
    { platform: 'darwin' },
    { platform: 'linux', arch: 'x64' },
]);

const GIF_OPTIONS = arrayPush({ value: 'gifsicle', label: 'gifsicle' })
    .arrayPush(supportGiflossy ? { value: 'giflossy', label: 'giflossy' } : null)
    .toArray();

const getOptions = (fileType, state) => {
    if (/image\/jpg/.test(fileType) || /image\/jpeg/.test(fileType)) {
        return state.jpgOptions;
    }
    if (/image\/png/.test(fileType)) {
        return state.pngOptions;
    }
    if (/image\/svg/.test(fileType) || /image\/svg\+xml/.test(fileType)) {
        return state.svgOptions;
    }
    if (/image\/gif/.test(fileType)) {
        return state.gifOptions;
    }
    return undefined;
};

export default class HomePage extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            jpgOptions: JPG_OPTIONS.map(o => o.value),
            pngOptions: PNG_OPTIONS.map(o => o.value),
            svgOptions: SVG_OPTIONS.map(o => o.value),
            gifOptions: GIF_OPTIONS.map(o => o.value),
            processes: [],
            total: {
                originalSize: 0,
                size: 0,
                savedSum: 0,
                savedAvg: 0,
                savedMax: 0,
            },
        };
    }

    componentWillUnmount() {
        const { processes } = this.state;
        processes.forEach(p => p.removeListener('end', this._updateTotal));
    }

    _onUploadChange = file => {
        if (Array.isArray(file)) {
            file.forEach(this._compress);
        } else {
            this._compress(file);
        }
        return false;
    }

    _compress = file => {
        this.setState(state => {
            const { processes } = state;
            if (processes.find(proc => (
                proc.getFile().path === file.path && !proc.isFinished()
            ))) {
                return null;
            }
            const selectedOptions = getOptions(file.type, state);
            if (!Array.isArray(selectedOptions)) {
                return null;
            }
            const process = new Process(file, selectedOptions);
            process.on('end', this._updateTotal);
            return {
                processes: [
                    process,
                    ...processes,
                ],
            };
        });
    }

    _onPngOptionChange = checkedValues => {
        this.setState({ pngOptions: checkedValues });
    }

    _onJpgOptionChange = checkedValues => {
        this.setState({ jpgOptions: checkedValues });
    }

    _onGifOptionChange = checkedValues => {
        this.setState({ gifOptions: checkedValues });
    }

    _onSvgOptionChange = checkedValues => {
        this.setState({ svgOptions: checkedValues });
    }

    _updateTotal = () => {
        const { processes } = this.state;
        const total = processes.reduce(
            (result, process) => {
                if (!process.isFinished()) {
                    return result;
                }
                const newResult = {
                    originalSize: result.originalSize + process.getOriginalSize(),
                    size: result.size + process.getSize(),
                    savedSum: result.savedSum + process.getSave(),
                    savedMax: Math.max(result.savedMax, process.getSave()),
                };
                newResult.savedAvg = newResult.savedSum / processes.length;
                return newResult;
            }, {
                originalSize: 0,
                size: 0,
                savedSum: 0,
                savedAvg: 0,
                savedMax: 0,
            },
        );
        this.setState({ total });
    }

    _renderOptions = () => {
        const {
            jpgOptions, pngOptions,
            gifOptions, svgOptions,
        } = this.state;
        return (
            <Row>
                <Col xs={12}>
                    <h3>JPG</h3>
                    <CheckboxGroupGrid
                        options={JPG_OPTIONS}
                        onChange={this._onJpgOptionChange}
                        grid={{ xs: 8 }}
                        value={jpgOptions}
                    />
                </Col>
                <Col xs={12}>
                    <h3>PNG</h3>
                    <CheckboxGroupGrid
                        options={PNG_OPTIONS}
                        onChange={this._onPngOptionChange}
                        grid={{ xs: 8 }}
                        value={pngOptions}
                    />
                </Col>
                <Col xs={12}>
                    <h3>SVG</h3>
                    <CheckboxGroupGrid
                        options={SVG_OPTIONS}
                        onChange={this._onSvgOptionChange}
                        grid={{ xs: 8 }}
                        value={svgOptions}
                    />
                </Col>
                <Col xs={12}>
                    <h3>GIF</h3>
                    <CheckboxGroupGrid
                        options={GIF_OPTIONS}
                        onChange={this._onGifOptionChange}
                        grid={{ xs: 8 }}
                        value={gifOptions}
                    />
                </Col>
            </Row>
        );
    }

    _renderTotal = () => {
        const { total } = this.state;
        const {
            originalSize, size,
            savedAvg, savedMax,
        } = total;
        if (!originalSize) return null;
        return (
            <div className={styles.totalContainer}>
                <span>
                    Saved {formatBytes(originalSize - size)} out of {formatBytes(originalSize)}.
                </span>
                {' '}
                <span>
                    {savedAvg.toFixed(1)}% per file on avarage (up to {savedMax.toFixed(1)}%).
                </span>
            </div>
        );
    }

    render() {
        const { processes } = this.state;
        return (
            <div>
                <Card>
                    <h2>1. Choose the algorithms</h2>
                    {this._renderOptions()}
                </Card>
                <Card>
                    <h2>2. Pick the image files</h2>
                    <Dragger
                        name="file"
                        multiple
                        beforeUpload={this._onUploadChange}
                        accept={ACCEPT_FILES}
                        showUploadList={false}
                        fileList={[]}
                    >
                        <p className="ant-upload-drag-icon">
                            <Icon type="picture" />
                        </p>
                        <p className="ant-upload-text">
                            Click or drag images to this area to optimize
                        </p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload.
                        </p>
                    </Dragger>
                </Card>
                <Card>
                    <h2>3. See the magic!</h2>
                    <TableProcesses dataSource={processes} />
                    {this._renderTotal()}
                </Card>
            </div>
        );
    }

}
