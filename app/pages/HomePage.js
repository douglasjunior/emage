import React, { Component } from 'react';

import {
    Upload, Icon, Card,
    Row, Col,
} from '../components/antd';
import CheckboxGroupGrid from '../components/CheckboxGroupGrid';
import TableProcesses from '../components/TableProcesses';
import Process from '../utils/Process';

// import styles from './HomePage.scss';

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

];

const GIF_OPTIONS = [

];

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

export default class HomePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            jpgOptions: JPG_OPTIONS.map(o => o.value),
            pngOptions: PNG_OPTIONS.map(o => o.value),
            svgOptions: SVG_OPTIONS.map(o => o.value),
            gifOptions: GIF_OPTIONS.map(o => o.value),
            processes: [],
        };
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
            return {
                processes: [
                    new Process(file, selectedOptions),
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
                    <h3>GIF</h3>
                    <CheckboxGroupGrid
                        options={GIF_OPTIONS}
                        onChange={this._onGifOptionChange}
                        grid={{ xs: 8 }}
                        value={gifOptions}
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
            </Row>
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
                        <p className="ant-upload-text">Click or drag images to this area to optimize</p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload.
                        </p>
                    </Dragger>
                </Card>
                <Card>
                    <h2>3. See the magic!</h2>
                    <TableProcesses dataSource={processes} />
                </Card>
            </div>
        );
    }

}
