import { IPollModel, IVote } from '../../interfaces/polls';
import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import config from '../../configs';

export class PollGeneratedApi {
    constructor(){}

    get getPolls(): AxiosPromise<IPollModel[]> {
        return axios.get(`${config.socket}/api/polls`);
    }

    castVote(vote: IVote, token: string) {
        let configRequest: AxiosRequestConfig = {
            headers: {
                'Authorization': `JWT ${token}`,
                'Content-Type': 'application/json',
            }
        }
        return axios.post(`${config.socket}/api/vote`, vote, configRequest)
    }
}