import React, { Component } from 'react';

import { HashRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import ptBR from 'antd/lib/locale-provider/pt_BR';

import { LocaleProvider } from './components/antd';
import MainLayout from './layouts/MainLayout';

class App extends Component {

    state = {};

    render() {
        return (
            <HashRouter>
                <LocaleProvider locale={ptBR}>
                    <MainLayout />
                </LocaleProvider>
            </HashRouter>
        );
    }

}

export default hot(module)(App);
