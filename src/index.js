import React from 'react';
import ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';
import './styles/styles.scss';

import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import IntlProviderWrapper from "./hoc/IntlProviderWrapper";

import { Provider } from 'react-redux';
import reduxStore, { persistor } from './redux';

import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter as Router

const renderApp = () => {
    ReactDOM.render(
        <Provider store={reduxStore}>
            <IntlProviderWrapper>
                <Router> {/* Wrap App with Router */}
                    <App persistor={persistor}/>
                </Router>
            </IntlProviderWrapper>
        </Provider>,
        document.getElementById('root')
    );
};

renderApp();

serviceWorker.unregister();
