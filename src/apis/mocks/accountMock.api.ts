import { IPostModel } from '../../interfaces/posts';
import { AxiosPromise } from 'axios';
import { IUserModel } from '../../interfaces/Users';

const USERS = process.env.ENV !== 'production' ?  require('./jsons/users.json') : null;


export class AccountMockApi {
    constructor(){}

    authUser(data): AxiosPromise<IUserModel> {
        return <AxiosPromise>Promise.resolve({ data: USERS[0] });

    }

    tryAuth(token: string, returnUrl?: string): AxiosPromise<IUserModel> {
        return <AxiosPromise>Promise.resolve({ data: USERS[0] });
    }
}