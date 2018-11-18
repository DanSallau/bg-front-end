
import * as constants from '../constants'
import { IUserModel } from './Users';
import { IPostModel } from './posts';
import { IPollModel } from './polls';
import { ICategoryModel } from './categories';
import { IError } from './common';
export interface IAddUsers {
    type: constants.ADD_USERS,
    users: Array<IUserModel>
}

export interface IRequestUsers {
    type: constants.REQUEST_USERS,
}

export interface ILogUserError {
    type: constants.LOG_USER_ERROR,
    error: any,
}

export interface IAccountActionState {
    type: string,
    user?: IUserModel,
    token?: string,
    error?: IError,
    returnUrl?: string,
}

export interface IPollActionState {
    type: string,
    polls?: Array<IPollModel>,
    error?: any,
}

export interface ICommentActionState {
    type: string,
    comment?: string,
    error?: any,
}

export interface ICategoryActionState {
    type: string,
    categories?: Array<ICategoryModel>,
    error?: any
}

export interface IReceivePosts {
    type: constants.RECEIVE_POST,
    posts: Array<IPostModel>
    receivedAt: string
}

export interface IRequestPosts {
    type: constants.REQUEST_POST
}

export interface ILogPostError {
    type: constants.LOG_POST_ERROR,
    error: any,
}

export interface IInvalidatePosts {
    type: constants.INVALIDATE_POST
}

export interface IrequestAuth {
    type: constants.REQUEST_AUTH_USER;
}