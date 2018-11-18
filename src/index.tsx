import * as React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';

import { HashRouter } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

import './styles/scss/main.scss';

import AppContainer from './containers/App/AppContainer';

import storeConfig from './store/configureStore';

import { PersistGate } from 'redux-persist/integration/react';

import { IntlProvider } from 'react-intl';


const { persistor, store } = storeConfig();

render(
  <Provider store={store}>
    <IntlProvider locale="en">
      <PersistGate loading={null} persistor={persistor}>
        <HashRouter>
          <AppContainer />
        </HashRouter>
      </PersistGate>
    </IntlProvider>
  </Provider>, document.getElementById('app') as HTMLElement);

registerServiceWorker();
