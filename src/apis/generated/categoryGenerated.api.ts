import { ICategoryModel } from '../../interfaces/categories';
import axios, { AxiosPromise } from 'axios';
import config from '../../configs';

export class CategoryGeneratedApi {
    constructor(){}

    get getCategories(): AxiosPromise<ICategoryModel[]> {
        return axios.get(`${config.socket}/api/categories`);
    }
}