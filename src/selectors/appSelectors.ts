import { createSelector, createStructuredSelector } from 'reselect';

const account = (state, ownProps) => state.account;

const users = (state, ownProps) => state.users;

const polls = (state, ownProps) => state.polls;

const categories = (state, ownProps) => state.categories;

const posts = (state, ownProps) => state.posts;

const routeProps = (state, ownProps) => ownProps;

const comment = (state) => state.commentStatus;

const isLoading = createSelector(
    [posts, account, users, categories, polls, comment],
    (postList, accountList, usersList, categoryList, pollList, commentStatus) => {
        return (postList.isFetching) ||
            (accountList.isFetching ) ||
            (usersList.isFetching) ||
            (categoryList.isFetching) ||
            (pollList.isFetching) ||
            (commentStatus.isFetching)

    }
);

export default createStructuredSelector({
    account,
    isLoading,
    ...routeProps
})