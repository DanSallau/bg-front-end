import { AxiosPromise } from 'axios';
import { ICommentModel, IPostModel } from '../../interfaces/posts';

const COMMENTS = process.env.ENV !== 'production' ? require('./jsons/posts.json') : null;


export class CommentMockApi {
    constructor() { }

    get createComment(): AxiosPromise<IPostModel[]> {
        return <AxiosPromise>Promise.resolve({ data: COMMENTS });
    }
}