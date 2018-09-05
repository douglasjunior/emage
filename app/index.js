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
const { AppContainer } = require('react-hot-loader');

require('./styles');

const render = Comp => {
    const NextApp = require('./App').default;
    ReactDOM.render(
        <AppContainer>
            <NextApp />
        </AppContainer>,
        document.getElementById('root'),
    );
};

render();

if (module.hot) {
    module.hot.accept('./App', () => {
        render();
    });
}
