import { ADD_USERS, REQUEST_USERS, LOG_USER_ERROR } from '../constants';
import { userActions } from '../actions/userActions';

const initialState = {
    isFetching: false,
    didInvalidate: false,
    items: []
};

export default (state = initialState, action: userActions) => {
    switch (action.type) {
        case ADD_USERS: {
            return Object.assign({}, state, {
                items: action.users,
                isFetching: false,
                didInvalidate: false
            });
        }
        case REQUEST_USERS: {
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
            });
        }
        case LOG_USER_ERROR:
            return {
                ...state,
                error: action.error,
                isFetching: false,
            }
        default:
            return state;

    }

}