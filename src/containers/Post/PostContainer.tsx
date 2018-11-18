import {withRouter} from 'react-router-dom';

import {mergeProps} from '../../utils';

import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import * as actions from '../../actions';
import PostComponent from '../../components/Post/PostComponent';

// import AppSelectors from '../selectors/AppSelectors';
import postStateProps from '../../selectors/postSelectors';


const mapDispatchToProps = (dispatch : Dispatch < any >) => {
    return {
        getUsers: () => dispatch(actions.fetchUsersIfNeeded()),
        getPosts: () => dispatch(actions.fetchPostsIfNeeded())
    }
};

export default withRouter < any > (connect(postStateProps, mapDispatchToProps, mergeProps)(PostComponent));