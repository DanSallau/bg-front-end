import { RECEIVE_POST, REQUEST_POST, INVALIDATE_POST, LOG_POST_ERROR } from '../constants';
import {  postAction} from '../actions/selectedPostAction';
import { IPostModel } from '../interfaces/posts';

const initialState = {
    isFetching: false,
    didInvalidate: false,
    post: <IPostModel>{}
};

export default (state = initialState, action: postAction) => {
    switch (action.type) {
        case RECEIVE_POST: {
            console.log("It has finally really came here baby", action.post)
            return Object.assign({}, state, {
                post: action.post,
                isFetching: false,
                didInvalidate: false
            });
        }
        case REQUEST_POST: {
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
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