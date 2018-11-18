import { IPostModel, ICommentModel } from '../../interfaces/posts';
import axios, { AxiosPromise,AxiosRequestConfig } from 'axios';
import config from '../../configs'

export class CommentGeneratedApi {
    constructor() { }

    createComment(comment: ICommentModel, token: string): AxiosPromise<IPostModel[]> {
        let configRequest: AxiosRequestConfig = {
            headers: {
                'Authorization': `JWT ${token}`,
                'Content-Type': 'application/json',
            }
        }
        return axios.post(`${config.socket}/api/comment/create-comment`, comment, configRequest);
    }

    castCommentVote(comment: ICommentModel, token: string): AxiosPromise<IPostModel[]> {
        let configRequest: AxiosRequestConfig = {
            headers: {
                'Authorization': `JWT ${token}`,
                'Content-Type': 'application/json',
            }
        }
        return axios.post(`${config.socket}/api/comment/vote-on-comment`, comment, configRequest);
    }

    flagComment(comment: ICommentModel, token: string): AxiosPromise<IPostModel[]> {
        let configRequest: AxiosRequestConfig = {
            headers: {
                'Authorization': `JWT ${token}`,
                'Content-Type': 'application/json',
            }
        }
        return axios.post(`${config.socket}/api/comment/flag-comment`, comment, configRequest);
    }

    uploadImage(fd: FormData, token: string): AxiosPromise<any> {
        let configRequest: AxiosRequestConfig = {
            headers: {
                'Authorization': `JWT ${token}`,
                'Content-Type': 'application/json',
            }
        }

        return axios.post(`${config.socket}/api/comment/upload-image`, fd, configRequest);
    }
}