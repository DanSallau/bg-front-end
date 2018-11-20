import { IPostModel } from '../interfaces/posts';
import * as constants from '../constants';
import { Dispatch } from 'redux';
import { ISelectedPostState } from '../interfaces/Actions';
import { AxiosResponse } from 'axios';
import { PostApi } from '../apis/post.api'

const postApi = new PostApi()

export function requestPost(): ISelectedPostState {
    return { type: constants.REQUEST_POST }
}

export function receivePost(post: IPostModel): ISelectedPostState {
    return {
        type: constants.RECEIVE_POST,
        receivedAt: Date.now().toString(),
        post,
    }
}

export function invalidatePost(): ISelectedPostState {
    return { type: constants.INVALIDATE_POST }
}

export function logPostError(error: any): ISelectedPostState {
    return {
        type: constants.LOG_POST_ERROR,
        error,
    }
}

function fetchPost(postId: number) {
    return (dispatch: Dispatch<ISelectedPostState | any>, getState: () => {}) => {
        dispatch(requestPost());

        return postApi
            .getPostById(postId)
            .then((json: AxiosResponse) => dispatch(receivePost(json.data)))
            .catch(err => dispatch(logPostError(err)))
    }
}

function shouldFetchPost(state: any) {
    const post = state.selectedPost;
    if (post) {
        return true;
    } else if (post.isFetching) {
        return false;
    } else {
        return post.didInvalidate;
    }
}

export function fetchPostIfNeeded(postId: number) {
    console.log("It has passed the initial ", postId)
    return (dispatch: Dispatch<ISelectedPostState | any>, getState: () => {}) => {
        if (shouldFetchPost(getState())) {
            return dispatch(fetchPost(postId));
        } else {
            return Promise.resolve();
        }
    }
}

export type postAction = ISelectedPostState;
