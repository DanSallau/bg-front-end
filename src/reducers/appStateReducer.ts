/*
import { ADD_LANGUAGES, SET_SELECTED_LANGUAGE, ADD_TRANSLATIONS, REQUEST_LANGUAGES } from '../constants';
import { AppStateAction } from '../actions';

const initialState = {
    isFetching: false,
    didInvalidate: false,
    languages: [],
    selectedLanguage: 'en',
    translations: []
};

export default (state = initialState, action: AppStateAction) => {
    switch (action.type) {
        case ADD_LANGUAGES: {
            // return { ...state, items: [...state.items, action.users] };
            return Object.assign({}, state, {
                languages: action.languages,
                isFetching: false,
                didInvalidate: false
            });
        }
        case REQUEST_LANGUAGES: {
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        }
        case SET_SELECTED_LANGUAGE: {
            return Object.assign({}, state, {
                selectedLanguage: action.selectedLanguage,
                isFetching: false,
                didInvalidate: false
            })
        }
        case ADD_TRANSLATIONS: {
            return Object.assign({}, state, {
                translations: [...state.translations, action.translations],
                isFetching: false,
                didInvalidate: false
            })
        }
        default:
            return state;

    }

}

*/