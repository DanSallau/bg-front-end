import { IUserModel } from './Users';
import { IError } from './common';

export interface IAccountState {
    isAuthenticated: boolean,
    authTime: string,
    user: IUserModel,
    isFetching: boolean,
    didInvalidate: boolean,
    error: IError,
    returnUrl: string,
}