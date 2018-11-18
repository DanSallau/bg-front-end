import { createStore, applyMiddleware , bindActionCreators} from 'redux';
import thunk from 'redux-thunk';
import * as allActions from '../actions';
import reducer from '../reducers';

import { composeWithDevTools } from 'redux-devtools-extension';


let store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk),
        // other store enhancers if any
    )
);


export const actions = bindActionCreators(allActions, store.dispatch);

export default store;