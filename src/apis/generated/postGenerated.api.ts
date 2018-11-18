import { IPostModel } from '../../interfaces/posts';
import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import config from '../../configs'

export class PostGeneratedApi {
    constructor() { }

    get getPosts(): AxiosPromise<IPostModel[]> {
        return axios.get(`${config.socket}/api/posts`);
    }

    createPost(post: IPostModel, token: string): AxiosPromise<IPostModel[]> {
        let configRequest: AxiosRequestConfig = {
            headers: {
                'Authorization': `JWT ${token}`,
                'Content-Type': 'application/json',
            }
        }
        return axios.post(`${config.socket}/api/post/create-post`, post, configRequest);
    }

    castPostVote(post: IPostModel, token: string): AxiosPromise<IPostModel[]> {
        let configRequest: AxiosRequestConfig = {
            headers: {
                'Authorization': `JWT ${token}`,
                'Content-Type': 'application/json',
            }
        }
        return axios.post(`${config.socket}/api/post/vote-on-post`, post, configRequest);
    }

    searchPostByText(searchText: string): AxiosPromise<IPostModel[]> {
        return axios.get(`${config.socket}/api/post/search-post-by-text?searchText=${searchText}`);
    }
    
    flagPost(post: IPostModel, token: string): AxiosPromise<IPostModel[]> {
        let configRequest: AxiosRequestConfig = {
            headers: {
                'Authorization': `JWT ${token}`,
                'Content-Type': 'application/json',
            }
        }
        return axios.post(`${config.socket}/api/post/flag-post`, post, configRequest);
    }

    uploadImage(fd: FormData, token: string): AxiosPromise<any> {
        let configRequest: AxiosRequestConfig = {
            headers: {
                'Authorization': `JWT ${token}`,
                'Content-Type': 'application/json',
            }
        }

        return axios.post(`${config.socket}/api/post/upload-image`, fd, configRequest);
    }
}