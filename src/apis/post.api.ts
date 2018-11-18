import axios, { AxiosPromise } from 'axios';
import { IPostModel } from '../interfaces/posts';
import { PostGeneratedApi } from './generated/postgenerated.api';
import config from '../configs';
import { PostMockApi } from './mocks/postMock.api';

export class PostApi {
    private postGeneratedApi: PostGeneratedApi;
    private postMockApi: PostMockApi;
    constructor() {
        this.postGeneratedApi = new PostGeneratedApi();
        this.postMockApi = new PostMockApi();
    }
    get getPosts(): AxiosPromise<IPostModel[]> {
        if (process.env.NODE_ENV === 'production' || config.isOnline) {
            return this.postGeneratedApi.getPosts;
        } else {
            return <AxiosPromise>new Promise(r => {
                setTimeout(() => {
                    r(this.postMockApi.getPosts);
                }, config.delay);
            });
        }
    }

    createPost(post: IPostModel, token: string): AxiosPromise<IPostModel[]> {
        if (process.env.NODE_ENV === 'production' || config.isOnline) {
            return this.postGeneratedApi.createPost(post, token);
        }
    }

    castPostVote(post: IPostModel, token: string): AxiosPromise<IPostModel[]> {
        if (process.env.NODE_ENV === 'production' || config.isOnline) {
            return this.postGeneratedApi.castPostVote(post, token);
        }
    }

    flagPost(post: IPostModel, token: string): AxiosPromise<IPostModel[]> {
        if (process.env.NODE_ENV === 'production' || config.isOnline) {
            return this.postGeneratedApi.flagPost(post, token);
        }
    }


    uploadImage(fd: FormData, token: string): AxiosPromise<any> {
        if (process.env.NODE_ENV === 'production' || config.isOnline) {
            return this.postGeneratedApi.uploadImage(fd, token);
        }
    }

    searchPostByText(searchText: string): AxiosPromise<IPostModel[]> {
        if (process.env.NODE_ENV === 'production' || config.isOnline) {
            return this.postGeneratedApi.searchPostByText(searchText);
        }
    }
}