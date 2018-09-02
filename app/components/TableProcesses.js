import React, { PureComponent } from 'react';

import { Table, Spin, Icon } from './antd';

const { Column } = Table;

const IconSpinning = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const IconDone = <Icon type="check-circle-o" style={{ fontSize: 24, color: 'green' }} />;
const IconError = <Icon type="close-circle-o" style={{ fontSize: 24, color: 'red' }} />;

class ColumnSpin extends PureComponent {

    state = {
        finished: false,
        error: null,
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
            error: process.getError(),
            finished: true,
        });
    }

    render() {
        const { finished, error } = this.state;
        return (
            <Spin
                indicator={
                    error
                        ? IconError
                        : finished
                            ? IconDone
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
        process.removeListener('finish', this._onEvent);
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
            <span>{save.toFixed(1)} %</span>
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
                    title=" "
                    render={this._renderSpin}
                    width="40px"
                />
                <Column
                    key="file"
                    title="File"
                    render={this._renderName}
                />
                <Column
                    key="orig_size"
                    title="Original Size"
                    render={this._renderOriginalSize}
                />
                <Column
                    key="size"
                    title="Size"
                    render={this._renderSize}
                />
                <Column
                    key="save"
                    title="Save"
                    render={this._renderSave}
                />
                <Column
                    key="executed_tools"
                    title="Tools"
                    render={this._renderTools}
                />
            </Table>
        );
    }

}
