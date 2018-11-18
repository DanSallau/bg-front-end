import { AUTH_USER, LOGOUT_USER, LOG_ACCOUNT_ERROR, LOG_RETURN_URL, REQUEST_AUTH_USER, INVALIDATE_AUTH_USER } from '../constants';
import { accountActions } from '../actions';

const initialState = {
    isAuthenticated: false,
    authTime: false,
    user: {},
    token: '',
    isFetching: false,
    didInvalidate: false,
    error: null,
    returnUrl: ''
};

export default (state = initialState, action: accountActions) => {
    switch (action.type) {
        case AUTH_USER: {
            return Object.assign({}, state, {
                user: action.user,
                isAuthenticated: true,
                authTime: Date.now().toString(),
                token: action.token,
                error: null,
                isFetching: false,
                didInvalidate: false
            });
        }
        case LOGOUT_USER: {
            return {
                ...state,
                user: {},
                token: undefined,
                isAuthenticated: false,
                authTime: Date.now().toString(),
                error: null,
                returnUrl: '',
                isFetching: false,
                didInvalidate: false
            }
        }
        case REQUEST_AUTH_USER: {
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        }
        case INVALIDATE_AUTH_USER: {
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true
            });
        }
        case LOG_ACCOUNT_ERROR: {
            return {
                ...state,
                error: action.error,
                isFetching: false,
            }
        }
        case LOG_RETURN_URL: {
            return {
                ...state,
                returnUrl: action.returnUrl
            }
        }
        default:
            return state;
    }

}