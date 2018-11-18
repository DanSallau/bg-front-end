import { IPostModel } from '../../interfaces/posts';
import { AxiosPromise } from 'axios';

const POSTS = process.env.ENV !== 'production' ?  require('./jsons/posts.json') : null;


export class PostMockApi {
    constructor(){}

    get getPosts(): AxiosPromise<IPostModel[]> {
        return <AxiosPromise>Promise.resolve({ data: POSTS });
    }
}