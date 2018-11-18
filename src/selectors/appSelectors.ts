import { createSelector, createStructuredSelector } from 'reselect';

const account = (state, ownProps) => state.account;

const users = (state, ownProps) => state.users;

const polls = (state, ownProps) => state.polls;

const categories = (state, ownProps) => state.categories;

const posts = (state, ownProps) => state.posts;

const routeProps = (state, ownProps) => ownProps;

const isLoading = createSelector(
    [posts, account, users, categories, polls],
    (postList, accountList, usersList, categoryList, pollList) => {
        return (postList.isFetching) ||
            (accountList.isFetching ) ||
            (usersList.isFetching) ||
            (categoryList.isFetching) ||
            (pollList.isFetching)

    }
);

export default createStructuredSelector({
    account,
    isLoading,
    ...routeProps
})