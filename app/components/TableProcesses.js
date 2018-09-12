import React, { PureComponent } from 'react';

import {
    Table, Spin, Icon,
    Tooltip, Popover, List,
} from './antd';

const { Column } = Table;

const IconSpinning = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const IconDone = <Icon type="check-circle-o" style={{ fontSize: 24, color: 'green' }} />;

class ColumnSpin extends PureComponent {

    state = {
        finished: false,
        errors: [],
    }

    componentDidMount() {
        const { process } = this.props;
        this.setState({
            finished: process.isFinished(),
        });
        process.on('finish', this._onEvent);
    }

    componentWillUnmount() {
        const { process } = this.props;
        process.removeListener('finish', this._onEvent);
    }

    _onEvent = () => {
        const { process } = this.props;
        this.setState({
            errors: process.getErrors(),
            finished: true,
        });
    }

    _renderErrors = () => {
        const { errors } = this.state;
        return (
            <Popover
                content={(
                    <List
                        rowKey={item => item.algorithm}
                        dataSource={errors}
                        renderItem={({ algorithm, message }) => (
                            <List.Item>
                                <div>
                                    <strong>{algorithm}: </strong>
                                    <span>{message}</span>
                                </div>
                            </List.Item>
                        )}
                    />
                )}
                placement="right"
            >
                <Icon type="close-circle-o" style={{ fontSize: 24, color: 'red' }} />
            </Popover>
        );
    };

    render() {
        const { finished, errors } = this.state;
        return (
            <Spin
                indicator={
                    finished
                        ? errors.length
                            ? this._renderErrors()
                            : IconDone
                        : IconSpinning
                }
                size="small"
            />
        );
    }

}

class ColumnSize extends PureComponent {

    state = {
        size: 0,
    }

    componentDidMount() {
        const { process } = this.props;
        this.setState({
            size: process.getSize(),
        });
        process.on('end', this._onEvent);
    }

    componentWillUnmount() {
        const { process } = this.props;
        process.removeListener('end', this._onEvent);
    }

    _onEvent = (_, size) => {
        this.setState({ size });
    }

    render() {
        const { size } = this.state;
        return (
            <span>{size}</span>
        );
    }

}

class ColumnSave extends PureComponent {

    state = {
        save: 0,
    }

    componentDidMount() {
        const { process } = this.props;
        this.setState({ save: process.getSave() });
        process.on('end', this._onEvent);
    }

    componentWillUnmount() {
        const { process } = this.props;
        process.removeListener('end', this._onEvent);
    }

    _onEvent = () => {
        const { process } = this.props;
        this.setState({ save: process.getSave() });
    }

    render() {
        const { save } = this.state;
        return (
            <span>{save.toFixed(1)}%</span>
        );
    }

}

class ColumnTools extends PureComponent {

    state = {
        tools: [],
    }

    componentDidMount() {
        const { process } = this.props;
        this.setState({ tools: process.getFinishedAlgorithms() });
        process.on('end', this._onEvent);
    }

    componentWillUnmount() {
        const { process } = this.props;
        process.removeListener('end', this._onEvent);
    }

    _onEvent = () => {
        const { process } = this.props;
        this.setState({ tools: process.getFinishedAlgorithms() });
    }

    render() {
        const { tools } = this.state;
        return (
            <span>{tools.join('+')}</span>
        );
    }

}

export default class TableProcesses extends PureComponent {

    _rowKey = process => process.getFile().uid;

    _renderSpin = (_, process) => {
        return <ColumnSpin process={process} />;
    }

    _renderName = (_, process) => {
        return process.getFile().name;
    }

    _renderOriginalSize = (_, process) => {
        return process.getOriginalSize();
    }

    _renderSize = (_, process) => {
        return <ColumnSize process={process} />;
    }

    _renderSave = (_, process) => {
        return <ColumnSave process={process} />;
    }

    _renderTools = (_, process) => {
        return <ColumnTools process={process} />;
    }

    render() {
        const { dataSource } = this.props;
        return (
            <Table
                dataSource={dataSource}
                size="small"
                pagination={false}
                rowKey={this._rowKey}
            >
                <Column
                    key="spin"
                    title={(
                        <Tooltip title="Compressing">
                            <span>{' '}</span>
                        </Tooltip>
                    )}
                    render={this._renderSpin}
                    width="40px"
                />
                <Column
                    key="file"
                    title={(
                        <Tooltip title="File name">
                            <span>File</span>
                        </Tooltip>
                    )}
                    render={this._renderName}
                />
                <Column
                    key="orig_size"
                    title={(
                        <Tooltip title="The size of file before compressing">
                            <span>Original Size</span>
                        </Tooltip>
                    )}
                    render={this._renderOriginalSize}
                    width="15%"
                />
                <Column
                    key="size"
                    title={(
                        <Tooltip title="The size of file after compressing">
                            <span>Size</span>
                        </Tooltip>
                    )}
                    render={this._renderSize}
                    width="15%"
                />
                <Column
                    key="save"
                    title={(
                        <Tooltip title="Percent saved after compression">
                            <span>Savings</span>
                        </Tooltip>
                    )}
                    render={this._renderSave}
                    width="10%"
                />
                <Column
                    key="executed_tools"
                    title={(
                        <Tooltip title="Tools that have been able to compress the file">
                            <span>Tools</span>
                        </Tooltip>
                    )}
                    render={this._renderTools}
                    width="20%"
                />
            </Table>
        );
    }

}
