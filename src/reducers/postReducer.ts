import { postActions } from '../actions/postActions'
import { RECEIVE_POST, REQUEST_POST, INVALIDATE_POST, LOG_POST_ERROR } from '../constants';

const initialState = {
    isFetching: false,
    didInvalidate: false,
    items: [],
    receiveAt: Date.now().toString(),
    error: null,
};

export default (state = initialState, action: postActions) => {
    switch (action.type) {
        case RECEIVE_POST:
            console.log("Object is receiving");
            return {
                ...state,
                items: action.posts,
                isFetching: false,
                didInvalidate: false
            }
        /*
        return Object.assign({}, state, {
            items: action.posts,
            isFetching: false,
            didInvalidate: false
        });*/

        case REQUEST_POST:
            {
                return Object.assign({}, state, {
                    isFetching: true,
                    didInvalidate: false
                });
            }
        case INVALIDATE_POST:
            {
                return Object.assign({}, state, {
                    isFetching: false,
                    didInvalidate: true
                });
            }
        case LOG_POST_ERROR:
            return {
                ...state,
                error: action.error,
                isFetching: false,
            }
        default:
            return state;
    }
}