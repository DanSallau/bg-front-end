import { IPostModel } from '../interfaces/posts';
import * as constants from '../constants';
import { Dispatch } from 'redux';
import { IReceivePosts, IRequestPosts, IInvalidatePosts, ILogPostError } from '../interfaces/Actions';
import { AxiosResponse } from 'axios';
import { PostApi } from '../apis/post.api'

const postApi = new PostApi()

export function requestPosts(): IRequestPosts {
    return { type: constants.REQUEST_POST }
}

export function receivePosts(posts: Array<IPostModel>): IReceivePosts {
    return {
        type: constants.RECEIVE_POST,
        receivedAt: Date.now().toString(),
        posts: posts
    }
}

export function invalidatePosts(): IInvalidatePosts {
    return { type: constants.INVALIDATE_POST }
}

export function logPostError(error: any): ILogPostError {
    return {
        type: constants.LOG_POST_ERROR,
        error,
    }
}

function fetchPosts() {
    return (dispatch: Dispatch<IReceivePosts | any>, getState: () => {}) => {
        dispatch(requestPosts());

        return postApi
            .getPosts
            .then((json: AxiosResponse) => dispatch(receivePosts(json.data)))
            .catch(err => dispatch(logPostError(err)))
    }
}

function shouldFetchPosts(state: any) {
    const posts = state.posts;
    if (posts.items.length === 0) {
        return true;
    } else if (posts.isFetching) {
        return false;
    } else {
        return posts.didInvalidate;
    }
}

export function fetchPostsIfNeeded() {
    return (dispatch: Dispatch<IReceivePosts | any>, getState: () => {}) => {
        if (shouldFetchPosts(getState())) {
            return dispatch(fetchPosts());
        } else {
            return Promise.resolve();
        }
    }
}
export function createPost(post: IPostModel) {
    return (dispatch: Dispatch<IReceivePosts | any>, getState: () => any) => {
        dispatch(requestPosts());
        const token = getState().account.token;
        return postApi
            .createPost(post, token)
            .then((json: AxiosResponse) => dispatch(receivePosts(json.data)))
            .catch(err => dispatch(logPostError(err)));
    }
}
export type postActions = IReceivePosts | IRequestPosts | IInvalidatePosts | ILogPostError;
