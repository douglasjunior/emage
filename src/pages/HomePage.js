import React, { Component } from 'react';

import fs from 'fs';

import {
    Upload, Icon, Card,
    Row, Col,
} from '../components/antd';
import CheckboxGroupGrid from '../components/CheckboxGroupGrid';

// import styles from './HomePage.scss';

const { Dragger } = Upload;

const JPG_OPTIONS = [
    { value: 'jpegtran', label: 'jpeg tran' },
    { value: 'mozjpeg', label: 'moz jpeg' },
    { value: 'webp', label: 'webp' },
    { value: 'guetzli', label: 'guetzli' },
    { value: 'jpegRecompress', label: 'jpeg Recompress' },
    { value: 'jpegoptim', label: 'jpeg optim' },
];

const PNG_OPTIONS = [
    { value: 'pngquant', label: 'png quant' },
    { value: 'optipng', label: 'opti png' },
    { value: 'pngout', label: 'pngout' },
    { value: 'webp', label: 'webp' },
    { value: 'pngcrush', label: 'pngcrush' },
];

const GIT_OPTIONS = [
    { value: 'gifsicle', label: 'gif sicle' },
    { value: 'giflossy', label: 'gif lossy' },
    { value: 'gif2webp', label: 'gif2webp' },
];

const SVG_OPTIONS = [
    { value: 'svgo', label: 'svgo' },
];

export default class HomePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            jpgOptions: ['guetzli'],
            pngOptions: [],
            gifOptions: [],
            svgOptions: [],
        };
    }

    _onUploadChange = file => {
        console.log(file);
        console.log(fs.existsSync(file.path));
        return false;
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
                        grid={{ xs: 12 }}
                        value={jpgOptions}
                    />
                </Col>
                <Col xs={12}>
                    <h3>PNG</h3>
                    <CheckboxGroupGrid
                        options={PNG_OPTIONS}
                        onChange={this._onPngOptionChange}
                        grid={{ xs: 12 }}
                        value={pngOptions}
                    />
                </Col>
                <Col xs={12}>
                    <h3>GIF</h3>
                    <CheckboxGroupGrid
                        options={GIT_OPTIONS}
                        onChange={this._onGifOptionChange}
                        grid={{ xs: 12 }}
                        value={gifOptions}
                    />
                </Col>
                <Col xs={12}>
                    <h3>SVG</h3>
                    <CheckboxGroupGrid
                        options={SVG_OPTIONS}
                        onChange={this._onSvgOptionChange}
                        grid={{ xs: 12 }}
                        value={svgOptions}
                    />
                </Col>
            </Row>
        );
    }

    render() {
        return (
            <div>
                <Card>
                    {this._renderOptions()}
                </Card>
                <Card>
                    <Dragger
                        name="file"
                        multiple
                        beforeUpload={this._onUploadChange}
                        accept="image/png,image/jpg,image/jpeg,image/svg,image/gif,image/svg+xml"
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
            </div>
        );
    }

}
