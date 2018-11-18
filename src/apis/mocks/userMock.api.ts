import { IUserModel } from '../../interfaces/Users';
import { AxiosPromise } from 'axios';

const USERS = process.env.ENV !== 'production' ? require('./jsons/users.json') : null;


export class UserMockApi {
    constructor() { }

    get getUsers(): AxiosPromise<IUserModel[]> {
        return <AxiosPromise>Promise.resolve({ data: USERS });
    }
}