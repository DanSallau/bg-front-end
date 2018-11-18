import axios, { AxiosPromise } from 'axios';
import { IUserModel } from '../interfaces/Users';
import { AccountGeneratedApi } from './generated/accountGenerated.api';
import config from '../configs';
import { AccountMockApi } from './mocks/accountMock.api';

export class AccountApi {
    private accountGenerated: AccountGeneratedApi;
    private accountMockApi: AccountMockApi;
    constructor() {
        this.accountGenerated = new AccountGeneratedApi();
        this.accountMockApi = new AccountMockApi();
    }

    authUser(data): AxiosPromise<IUserModel> {
        if (process.env.NODE_ENV === 'production' || config.isOnline) {
            return this.accountGenerated.authUser(data);
        } else {
            return <AxiosPromise>new Promise(r => {
                setTimeout(() => {
                    r(this.accountMockApi.authUser(data));
                }, config.delay);
            });
        }
    }

    tryAuth(token: string, returnUrl?: string): AxiosPromise<IUserModel> {
        if (process.env.NODE_ENV === 'production' || config.isOnline) {
            return this.accountGenerated.tryAuth(token);
        } else {
            return <AxiosPromise>new Promise(r => {
                setTimeout(() => {
                    r(this.accountMockApi.tryAuth(token));
                }, config.delay);
            });
        }
    }

    resetPassword(emailConfig: { email: string }): AxiosPromise<any> {
        if (process.env.NODE_ENV === 'production' || config.isOnline) {
            console.log("chop shit ", emailConfig)
            return this.accountGenerated.resetPassword(emailConfig);
        }
    }
}