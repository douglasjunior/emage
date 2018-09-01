import React from 'react';
import ReactDOM from 'react-dom';

import './styles';
import App from './App';

window.Promise = require('bluebird');
window.axios = require('axios').default;
window.moment = require('moment-timezone');
require('moment/locale/pt-br'); // eslint-disable-line import/no-extraneous-dependencies

ReactDOM.render(
    <App />,
    document.getElementById('root'),
);
