import { IAccountActionState, IRequestAuth } from '../interfaces/actions';
import { IError} from '../interfaces/common';
import { IUserModel } from '../interfaces/Users';
import * as constants from '../constants';
import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';
import { AccountApi } from '../apis/account.api';


const accountApi = new AccountApi;

export function authenticateUser({ userName, password, remember }) {
    return (dispatch: Dispatch<IAccountActionState>, getState: () => {}) => {
        dispatch(requestAuth());
        return accountApi
            .authUser({ userName, password })
            .then((response: AxiosResponse) => {
                dispatch(authUser(response.data.user, response.data.token))
            })
            .catch(err => {
                dispatch(logAccountError(err))
            })
    }
}

export function logoutUser() {
    return { type: constants.LOGOUT_USER }
}

export function authUser(user: IUserModel, token: string): IAccountActionState {
    return { type: constants.AUTH_USER, user, token }
}

export function requestAuth(): IRequestAuth {
    return { type: constants.REQUEST_AUTH_USER }
}

export function tryAuth(token: string) {
    return (dispatch: Dispatch<IAccountActionState>, getState: () => {}) => {
        dispatch(requestAuth());
        return accountApi
            .tryAuth(token)
            .then((response: AxiosResponse) => {
                dispatch(authUser(response.data.user, response.data.token))
            })
            .catch(err => {
                console.log("There is an error here baby ", err.response);
                if(err.response && err.response.data) {
                    dispatch(logAccountError(err.response.data));
                    dispatch(logoutUser());
                }
                else if (err.type === 'account') {
                    dispatch(logAccountError(err));
                    dispatch(logoutUser());
                }
            })
    }
}

export function logAccountError(error: IError) {
    return { type: constants.LOG_ACCOUNT_ERROR, error }
}

export function logReturnUrl(returnUrl: string) {
    return { type: constants.LOG_RETURN_URL, returnUrl };
}

export type accountActions = IAccountActionState;
