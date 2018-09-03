require('hazardous');

window.Promise = require('bluebird');
window.axios = require('axios').default;
window.moment = require('moment-timezone');

document.addEventListener('drop', e => {
    e.preventDefault();
    e.stopPropagation();
});
document.addEventListener('dragover', e => {
    e.preventDefault();
    e.stopPropagation();
});

const React = require('react');
const ReactDOM = require('react-dom');

require('./styles');
const App = require('./App').default;

ReactDOM.render(
    <App />,
    document.getElementById('root'),
);
