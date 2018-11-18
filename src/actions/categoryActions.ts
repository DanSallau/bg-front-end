import {ICategoryActionState} from '../interfaces/Actions';
import { Dispatch } from 'redux';
import * as constants from '../constants';
import { ICategoryModel } from '../interfaces/categories';
import { CategoryApi } from '../apis/category.api';

const categoryApis = new CategoryApi()

export function fetchCategoriesIfNeeded() {
    return (dispatch: Dispatch<ICategoryActionState | any>, getState: () => {}) => {
        if (shouldFetchCategories(getState())) {
            return dispatch(fetchCategories())
        } else {
            Promise.resolve();
        }
    }
}

function receiveCategories(categories: Array<ICategoryModel>): ICategoryActionState {
    return { type: constants.RECEIVE_CATEGORY, categories }
}

function fetchCategories() {
    return (dispatch: Dispatch<ICategoryActionState>, getState: () => {}) => {
        dispatch(requestCategories());
        return categoryApis
            .categories
            .then(json => dispatch(receiveCategories(json.data)))
            .catch(err => dispatch(logCategoryError(err)));

    }
}

function logCategoryError(error: any): ICategoryActionState {
    return {
        type: constants.LOG_CATEGORY_ERROR,
        error,
    }
}

function requestCategories(): ICategoryActionState {
    return { type: constants.REQUEST_CATEGORY }
}

function shouldFetchCategories(state: any) {
    const categories = state.categories;
    if (categories.items.length === 0) {
        return true;
    } else if (categories.isFetching) {
        return false;
    } else {
        return categories.didInvalidate;
    }
}

export type categoryActions = ICategoryActionState;
