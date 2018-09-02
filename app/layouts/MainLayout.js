import React, { Component } from 'react';

import { Route } from 'react-router-dom';

import styles from './MainLayout.scss';
import { Layout } from '../components/antd';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';

export const ROUTES_ITEMS = [
    {
        to: '/',
        text: 'Home',
        icon: 'home',
        exact: true,
        component: HomePage,
    }, {
        to: '/about',
        text: 'About',
        icon: 'info-circle-o',
        component: AboutPage,
    },
];

const ROUTES = ROUTES_ITEMS.map(route => (
    <Route key={route.to} path={route.to} exact={route.exact} component={route.component} />
));

export default class MainLayout extends Component {

    state = {}

    render() {
        return (
            <Layout className={styles.layout}>
                {ROUTES}
            </Layout>
        );
    }

}
