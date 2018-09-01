import React from 'react';
import ReactDOM from 'react-dom';

import './styles';
import App from './App';

window.Promise = require('bluebird');
window.axios = require('axios').default;
window.moment = require('moment-timezone');
require('moment/locale/pt-br'); // eslint-disable-line import/no-extraneous-dependencies

document.addEventListener('dragover', event => event.preventDefault());
document.addEventListener('drop', event => event.preventDefault());

ReactDOM.render(
    <App />,
    document.getElementById('root'),
);
