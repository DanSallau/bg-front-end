import {IPollActionState} from '../interfaces/Actions';
import { Dispatch } from 'redux';
import * as constants from '../constants';
import { IPollModel } from '../interfaces/polls';
import { PollApi } from '../apis/poll.api';

const pollApis = new PollApi()

export function fetchPollsIfNeeded() {
    return (dispatch: Dispatch<IPollActionState | any>, getState: () => {}) => {
        if (shouldFetchPolls(getState())) {
            return dispatch(fetchPolls())
        } else {
            Promise.resolve();
        }
    }
}

export function receivePolls(polls: Array<IPollModel>): IPollActionState {
    return { type: constants.RECEIVE_POLL, polls }
}

function fetchPolls() {
    return (dispatch: Dispatch<IPollActionState>, getState: () => {}) => {
        dispatch(requestPolls());
        return pollApis
            .polls
            .then(json => dispatch(receivePolls(json.data)))
            .catch(err => dispatch(logPollsError(err)))

    }
}

export function requestPolls(): IPollActionState {
    return { type: constants.REQUEST_POLL }
}

export function logPollsError(error: any): IPollActionState {
    return {
        type: constants.LOG_POLL_ERROR,
        error,
    }
}

function shouldFetchPolls(state: any) {
    const polls = state.polls;
    if (polls.items.length === 0) {
        return true;
    } else if (polls.isFetching) {
        return false;
    } else {
        return polls.didInvalidate;
    }
}

export type pollActions = IPollActionState;
