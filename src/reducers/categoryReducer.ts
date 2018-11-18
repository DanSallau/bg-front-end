import { REQUEST_CATEGORY, RECEIVE_CATEGORY, LOG_CATEGORY_ERROR } from '../constants';
import { categoryActions } from '../actions/categoryActions';

const initialState = {
    isFetching: false,
    didInvalidate: false,
    items: [],
    error: undefined,
};

export default (state = initialState, action: categoryActions) => {
    switch (action.type) {
        case RECEIVE_CATEGORY: {
            return Object.assign({}, state, {
                items: action.categories,
                isFetching: false,
                didInvalidate: false
            });
        }
        case REQUEST_CATEGORY: {
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
            });
        }
        case LOG_CATEGORY_ERROR:
            return {
                ...state,
                error: action.error,
                isFetching: false,
            }

        default:
            return state;

    }

}