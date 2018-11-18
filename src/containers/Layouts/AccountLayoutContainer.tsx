import AccountLayout from '../../layouts/AccountLayout';
import {withRouter} from 'react-router-dom';

import {mergeProps} from '../../utils';

import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import * as actions from '../../actions';

// import AppSelectors from '../selectors/AppSelectors';

const mapStateToProps = (state, ownProps) => {
    return {
        posts: state.posts,
        account: state.account,
    }
}

const mapDispatchToProps = (dispatch : Dispatch <any>) => {
    return {
        signOut: () => dispatch(actions.logoutUser()),
    }
};

export default withRouter < any> (connect(mapStateToProps, mapDispatchToProps, mergeProps)(AccountLayout));