import {withRouter} from 'react-router-dom';

import {mergeProps} from '../../utils';

import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import * as actions from '../../actions';
import AppComponent from '../../components/App/AppComponent';

import AppSelectors from '../../selectors/appSelectors';
import { IError } from '../../interfaces/common';


const mapDispatchToProps = (dispatch : Dispatch < any >) => {
    return {
        getUsers: () => dispatch(actions.fetchUsersIfNeeded()),
        getPosts: () => dispatch(actions.fetchPostsIfNeeded()),
        signOut: () => dispatch(actions.logoutUser()),
        tryAuth: (token: string) => dispatch(actions.tryAuth(token)),
        logAccountError: (error: IError) => dispatch(actions.logAccountError(error)),
        getPolls: () => dispatch(actions.fetchPollsIfNeeded()),
        getCategories: () => dispatch(actions.fetchCategoriesIfNeeded())
    }
};

export default withRouter < any > (connect(AppSelectors, mapDispatchToProps, mergeProps)(AppComponent));