import {IPollActionState, ICommentActionState} from '../interfaces/Actions';
import { Dispatch } from 'redux';
import * as constants from '../constants';
import { IPollModel } from '../interfaces/polls';
import { PollApi } from '../apis/poll.api';

const pollApis = new PollApi()


export function requestComment(): ICommentActionState {
    return { type: constants.REQUEST_COMMENT }
}

export function logCommentError(error: any): ICommentActionState {
    return {
        type: constants.LOG_COMMENT_ERROR,
        error,
    }
}

export type commentActions = ICommentActionState;
