import Axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { IUserModel } from '../interfaces/Users';
import { UserGeneratedApi } from './generated/userGenerated.api';
import { UserMockApi } from './mocks/userMock.api';
import config from '../configs'

export class UserApi {
    private userMockApi: UserMockApi;
    private userGeneratedApi: UserGeneratedApi;
    constructor() {
        this.userMockApi = new UserMockApi();
        this.userGeneratedApi = new UserGeneratedApi();
    }

    get userListApi(): AxiosPromise<IUserModel[]> {

        if (process.env.NODE_ENV === 'production' || config.isOnline) {
            return this.userGeneratedApi.getUsers;
        } else {
            return <AxiosPromise>new Promise(r => {
                setTimeout(() => {
                    r(this.userMockApi.getUsers);
                }, config.delay);
            });
        }

    }

    createUser(user: IUserModel): AxiosPromise<IUserModel> {
        if (process.env.NODE_ENV === 'production' || config.isOnline) {
            return this.userGeneratedApi.createUser(user);
        }
    }

    getUserById(id: number): AxiosPromise<IUserModel> {

        return this.userMockApi.getUsers.then(e => {
            return <AxiosPromise>new Promise(r => {
                setTimeout(() => {
                    r(<AxiosPromise>Promise.resolve({ data: e.data.find(emp => emp.id === id) }));
                }, config.delay);
            });
        });

    }
}