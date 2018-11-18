import {createSelector, createStructuredSelector} from 'reselect';

const account = (state, ownProps) => state.account;

const routeProps = (state, ownProps) => ownProps;

export default createStructuredSelector({
    account,
    ...routeProps
})