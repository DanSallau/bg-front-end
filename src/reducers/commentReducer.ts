import { REQUEST_COMMENT, LOG_COMMENT_ERROR } from '../constants';
import { categoryActions } from '../actions/categoryActions';

const initialState = {
    isFetching: false,
    didInvalidate: false,
    error: undefined,
};

export default (state = initialState, action: categoryActions) => {
    switch (action.type) {
        
        case REQUEST_COMMENT: {
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
            });
        }
        case LOG_COMMENT_ERROR:
            return {
                ...state,
                error: action.error,
                isFetching: false,
            }

        default:
            return state;

    }

}