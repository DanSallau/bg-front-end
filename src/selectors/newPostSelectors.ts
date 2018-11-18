import { createSelector, createStructuredSelector } from 'reselect';

const account = (state, ownProps) => state.account;

const routeProps = (state, ownProps) => ownProps;
const users = (state, ownProps) => state.users;
const posts = (state, ownProps) => state.posts;
const categories = (state, ownProps) => state.categories;
export default createStructuredSelector({
    account,
    users,
    posts,
    categories,
    ...routeProps
})