import users from './userReducer';
import account from './accountReducer';
import posts from './postReducer';
import polls from './pollReducer';
import categories from './categoryReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    users,
    account,
    posts,
    polls,
    categories,
});