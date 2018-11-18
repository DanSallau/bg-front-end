import { ICategoryModel } from '../../interfaces/categories';
import { AxiosPromise } from 'axios';

const CATEGORIES = process.env.ENV !== 'production' ? require('./jsons/categories.json') : null;


export class CategoryMockApi {
    constructor() { }

    get getCategories(): AxiosPromise<ICategoryModel[]> {
        return <AxiosPromise>Promise.resolve({ data: CATEGORIES });
    }
}