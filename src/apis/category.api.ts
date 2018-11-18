import Axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { ICategoryModel } from '../interfaces/categories';
import { CategoryGeneratedApi } from './generated/categoryGenerated.api';
import {CategoryMockApi} from './mocks/categoryMock.api';
import config from '../configs'

export class CategoryApi {
    private categoryMockApi: CategoryMockApi;
    private categoryGeneratedApi: CategoryGeneratedApi;
    constructor() {
        this.categoryMockApi = new CategoryMockApi();
        this.categoryGeneratedApi = new CategoryGeneratedApi();
    }

    get categories(): AxiosPromise<ICategoryModel[]> {

        if (process.env.NODE_ENV === 'production' || config.isOnline) {
            return this.categoryGeneratedApi.getCategories;
        } else {
            return <AxiosPromise>new Promise(r => {
                setTimeout(() => {
                    r(this.categoryMockApi.getCategories);
                }, config.delay);
            });
        }

    }
}