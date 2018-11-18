import { withRouter } from 'react-router-dom';

import { mergeProps } from '../../utils';

import { connect } from 'react-redux';
import MessageComponent from '../../components/Message/MessageComponent';
import * as actions from '../../actions';
import { Dispatch } from 'redux';
import { IError } from '../../interfaces/common';

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        account: state.account
    };
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        tryAuth: (token: string) => dispatch(actions.tryAuth(token)),
        logAccountError: (error: IError) => dispatch(actions.logAccountError(error)),
    }
};

export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps, mergeProps)(MessageComponent));