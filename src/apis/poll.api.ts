import Axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { IPollModel, IVote } from '../interfaces/polls';
import { PollGeneratedApi } from './generated/pollGenerated.api';
import { PollMockApi } from './mocks/pollMock.api';
import config from '../configs'

export class PollApi {
    private pollMockApi: PollMockApi;
    private pollGeneratedApi: PollGeneratedApi;
    constructor() {
        this.pollMockApi = new PollMockApi();
        this.pollGeneratedApi = new PollGeneratedApi();
    }

    get polls(): AxiosPromise<IPollModel[]> {

        if (process.env.NODE_ENV === 'production' || config.isOnline) {
            return this.pollGeneratedApi.getPolls;
        } else {
            return <AxiosPromise>new Promise(r => {
                setTimeout(() => {
                    r(this.pollMockApi.getPolls);
                }, config.delay);
            });
        }

    }

    castVote(vote: IVote, token: string) {
        if (process.env.NODE_ENV === 'production' || config.isOnline) {
            return this.pollGeneratedApi.castVote(vote, token);
        } else {
            return <AxiosPromise>new Promise(r => {
                setTimeout(() => {
                    r(this.pollMockApi.getPolls);
                }, config.delay);
            });
        }
    }

    getpollById(id: number): AxiosPromise<IPollModel> {
        return this.pollMockApi.getPolls.then(e => {
            return <AxiosPromise>new Promise(r => {
                setTimeout(() => {
                    r(<AxiosPromise>Promise.resolve({ data: e.data.find(emp => emp.id === id) }));
                }, config.delay);
            });
        });

    }
}