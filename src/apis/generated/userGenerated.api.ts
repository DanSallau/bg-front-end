import { IUserModel } from '../../interfaces/Users';
import axios, { AxiosPromise } from 'axios';
import config from '../../configs';

export class UserGeneratedApi {
    constructor() { }

    get getUsers(): AxiosPromise<IUserModel[]> {
        return axios.get(`${config.socket}/api/users`);
    }

    createUser(user: IUserModel): AxiosPromise<IUserModel> {
        return axios.post(`${config.socket}/api/user/create-user`, user);
    }
}