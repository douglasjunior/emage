import React, { Component } from 'react';

import { HashRouter } from 'react-router-dom';

import { LocaleProvider } from './components/antd';
import MainLayout from './layouts/MainLayout';

class App extends Component {

    state = {};

    render() {
        return (
            <HashRouter>
                <LocaleProvider>
                    <MainLayout />
                </LocaleProvider>
            </HashRouter>
        );
    }

}

export default App;
