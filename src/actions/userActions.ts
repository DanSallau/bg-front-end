import * as constants from '../constants';
import { IAddUsers, IRequestUsers, ILogUserError } from '../interfaces/Actions';
import { IUserModel } from '../interfaces/Users';
import { Dispatch } from 'redux';
import { UserApi } from '../apis/user.api';

const userApis = new UserApi();

export function fetchUsersIfNeeded() {
    return (dispatch: Dispatch<IAddUsers | IRequestUsers | any>, getState: () => {}) => {
        if (shouldFetchUsers(getState())) {
            return dispatch(fetchUsers())
        } else {
            Promise.resolve();
        }
    }
}

function receiveUsers(users: Array<IUserModel>): IAddUsers {
    return { type: constants.ADD_USERS, users }
}

function logUserError(error: any): ILogUserError {
    return {
        type: constants.LOG_USER_ERROR,
        error,
    }
}

function fetchUsers() {
    return (dispatch: Dispatch<IAddUsers | IRequestUsers | any>, getState: () => {}) => {
        dispatch(requestUsers());
        return userApis
            .userListApi
            .then(json => dispatch(receiveUsers(json.data)))
            .catch(err => dispatch(logUserError(err)))

    }
}

function requestUsers(): IRequestUsers {
    return { type: constants.REQUEST_USERS }
}

function shouldFetchUsers(state: any) {
    const users = state.users;
    if (users.items.length === 0) {
        return true;
    } else if (users.isFetching) {
        return false;
    } else {
        return users.didInvalidate;
    }
}

export type userActions = IAddUsers | IRequestUsers | ILogUserError;
