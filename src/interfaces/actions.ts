
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

export interface IPostsState {
    type?: string;
    posts?: Array<IPostModel>;
    receivedAt?: string;
    error?: any;
}

export interface ISelectedPostState {
    type?: string;
    post?: IPostModel;
    receivedAt?: string;
    error?: any;
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

export interface IRequestAuth {
    type: constants.REQUEST_AUTH_USER;
}