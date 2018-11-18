import { withRouter } from 'react-router-dom';

import { mergeProps } from '../../utils';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as actions from '../../actions';
import NewAccountComponent from '../../components/NewAccount/NewAccountComponent';

// import AppSelectors from '../selectors/AppSelectors';

const mapStateToProps = (state, ownProps) => {
    return {
        users: state.users,
        posts: state.posts,
        account: state.account,
    }

}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        getUsers: () => dispatch(actions.fetchUsersIfNeeded()),
        getPosts: () => dispatch(actions.fetchPostsIfNeeded())
    }
};

export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps, mergeProps)(NewAccountComponent));