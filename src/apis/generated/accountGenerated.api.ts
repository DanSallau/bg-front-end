import { IUserModel } from '../../interfaces/Users';
import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import config from '../../configs'

export class AccountGeneratedApi {
    constructor() { }

    authUser(data): AxiosPromise<IUserModel> {
        return axios.post(`${config.socket}/api/authenticate-user`, data);
    }

    tryAuth(token: string, returnUrl?: string): AxiosPromise<IUserModel> {
        let configRequest: AxiosRequestConfig = {
            headers: {
                'Authorization': `JWT ${token}`,
                'Content-Type': 'application/json',
            }
        }

        return axios.get(`${config.socket}/api/check-login`, configRequest);
    }

    resetPassword(emailConfig: { email: string }): AxiosPromise<any> {
        return axios.post(`${config.socket}/api/user/forgot-password`, emailConfig)
    }
}