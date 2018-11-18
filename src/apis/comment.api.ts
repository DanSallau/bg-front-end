import Axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import config from '../configs'
import { ICommentModel, IPostModel } from '../interfaces/posts';
import { CommentMockApi } from './mocks/commentMock.api';
import { CommentGeneratedApi } from './generated/commentGenerated.api';

export class CommentApi {
    private commentMockApi: CommentMockApi;
    private commentGeneratedApi: CommentGeneratedApi;
    constructor() {
        this.commentMockApi = new CommentMockApi();
        this.commentGeneratedApi = new CommentGeneratedApi;
    }

    createComment(comment: ICommentModel, token: string): AxiosPromise<IPostModel[]> {
        if (process.env.NODE_ENV === 'production' || config.isOnline) {
            return this.commentGeneratedApi.createComment(comment, token);
        }
    }

    castCommentVote(comment: ICommentModel, token: string): AxiosPromise<IPostModel[]> {
        if (process.env.NODE_ENV === 'production' || config.isOnline) {
            return this.commentGeneratedApi.castCommentVote(comment, token);
        }
    }

    flagComment(comment: ICommentModel, token: string): AxiosPromise<IPostModel[]> {
        if (process.env.NODE_ENV === 'production' || config.isOnline) {
            return this.commentGeneratedApi.flagComment(comment, token);
        }
    }

    uploadImage(fd: FormData, token: string): AxiosPromise<any> {
        if (process.env.NODE_ENV === 'production' || config.isOnline) {
            return this.commentGeneratedApi.uploadImage(fd, token);
        }
    }
}