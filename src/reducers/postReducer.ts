import { postActions } from '../actions/postActions'
import { RECEIVE_POSTS, REQUEST_POSTS, INVALIDATE_POSTS, LOG_POSTS_ERROR } from '../constants';

const initialState = {
    isFetching: false,
    didInvalidate: false,
    items: [],
    receiveAt: Date.now().toString(),
    error: null,
};

export default (state = initialState, action: postActions) => {
    switch (action.type) {
        case RECEIVE_POSTS:
            return {
                ...state,
                items: action.posts,
                isFetching: false,
                didInvalidate: false
            }

        case REQUEST_POSTS:
            {
                return Object.assign({}, state, {
                    isFetching: true,
                    didInvalidate: false
                });
            }
        case INVALIDATE_POSTS:
            {
                return Object.assign({}, state, {
                    isFetching: false,
                    didInvalidate: true
                });
            }
        case LOG_POSTS_ERROR:
            return {
                ...state,
                error: action.error,
                isFetching: false,
            }
        default:
            return state;
    }
}