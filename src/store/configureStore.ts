/*
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
*/
/** @important Be sure to ONLY add this middleware in development! */
/*const middleware = process.env.NODE_ENV !== 'production' ?
  [require('redux-immutable-state-invariant').default(), thunk] :
  [thunk];*/

/**
 * Configures the Redux store
 * @param {any} initialState The initial state
 * @returns {any} The created Redux store
 *//*
function configureStore(initialState?: any): any {
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(...middleware)
    );
}

export default configureStore;
*/


 import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import { createStore, applyMiddleware , bindActionCreators} from 'redux';
import thunk from 'redux-thunk';
import * as allActions from '../actions';
import reducers from '../reducers';

import { composeWithDevTools } from 'redux-devtools-extension';


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['account'] // only navigation will be persisted

  };


const persistedReducer = persistReducer(persistConfig, reducers);



export default () => {
    let store = createStore(
        persistedReducer,
        composeWithDevTools(
            applyMiddleware(thunk),
            // other store enhancers if any
        )
    );
    let persistor = persistStore(store)
    return { store, persistor }
}
