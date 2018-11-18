import { IUserModel } from '../../interfaces/Users';
import { AxiosPromise } from 'axios';

const POLLS = process.env.ENV !== 'production' ? require('./jsons/polls.json') : null;


export class PollMockApi {
    constructor() { }

    get getPolls(): AxiosPromise<IUserModel[]> {
        return <AxiosPromise>Promise.resolve({ data: POLLS });
    }
}