import { REQUEST_POLL, RECEIVE_POLL, LOG_POLL_ERROR } from '../constants';
import { pollActions } from '../actions/pollActions';

const initialState = {
    isFetching: false,
    didInvalidate: false,
    items: [],
    error: null,
};

export default (state = initialState, action: pollActions) => {
    switch (action.type) {
        case RECEIVE_POLL: {
            return Object.assign({}, state, {
                items: action.polls,
                isFetching: false,
                didInvalidate: false
            });
        }
        case REQUEST_POLL: {
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
            });
        }
        case LOG_POLL_ERROR:
            return {
                ...state,
                error: action.error,
                isFetching: false,
            }
        default:
            return state;

    }

}