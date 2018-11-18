import {withRouter} from 'react-router-dom';

import {mergeProps} from '../../utils';

import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import * as actions from '../../actions';
import AccountLoginComponent from '../../components/AccountLogin/AccountLoginComponent';

import accountSelectors from '../../selectors/accountSelectors';

const mapDispatchToProps = (dispatch : Dispatch < any >) => {
    return {
        authenticateUser: (loginState) => dispatch(actions.authenticateUser({
            ...loginState
        }))
    }
};

export default withRouter < any > (connect(accountSelectors, mapDispatchToProps, mergeProps)(AccountLoginComponent));