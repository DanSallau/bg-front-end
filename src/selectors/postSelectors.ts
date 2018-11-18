import {createSelector, createStructuredSelector} from 'reselect';

const posts = (state, ownProps) => state.posts;

const routeProps = (state, ownProps) => ownProps;

export default createStructuredSelector({
    posts,
    ...routeProps
})