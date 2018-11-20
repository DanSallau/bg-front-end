import { IPostModel } from '../interfaces/posts';
import * as constants from '../constants';
import { Dispatch } from 'redux';
import { IPostsState } from '../interfaces/Actions';
import { AxiosResponse } from 'axios';
import { PostApi } from '../apis/post.api'

const postApi = new PostApi()

export function requestPosts(): IPostsState {
    return { type: constants.REQUEST_POSTS }
}

export function receivePosts(posts: Array<IPostModel>): IPostsState {
    return {
        type: constants.RECEIVE_POSTS,
        receivedAt: Date.now().toString(),
        posts: posts
    }
}

export function invalidatePosts(): IPostsState {
    return { type: constants.INVALIDATE_POSTS }
}

export function logPostsError(error: any): IPostsState {
    return {
        type: constants.LOG_POSTS_ERROR,
        error,
    }
}

function fetchPosts() {
    return (dispatch: Dispatch<IPostsState | any>, getState: () => {}) => {
        dispatch(requestPosts());

        return postApi
            .getPosts
            .then((json: AxiosResponse) => dispatch(receivePosts(json.data)))
            .catch(err => dispatch(logPostsError(err)))
    }
}

function shouldFetchPosts(state) {
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
    return (dispatch: Dispatch<IPostsState | any>, getState: () => {}) => {
        if (shouldFetchPosts(getState())) {
            return dispatch(fetchPosts());
        } else {
            return Promise.resolve();
        }
    }
}
export function createPost(post: IPostModel) {
    return (dispatch: Dispatch<IPostsState | any>, getState: () => { account: { token: string}}) => {
        dispatch(requestPosts());
        const token = getState().account.token;
        return postApi
            .createPost(post, token)
            .then((json: AxiosResponse) => dispatch(receivePosts(json.data)))
            .catch(err => dispatch(logPostsError(err)));
    }
}
export type postActions = IPostsState;
