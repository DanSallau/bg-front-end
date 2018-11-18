import PostLayout from '../../layouts/PostLayout';
import { withRouter } from 'react-router-dom';

import { mergeProps } from '../../utils';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as actions from '../../actions';

import postLayoutStateProps from '../../selectors/postLayoutsSelectors';
import { IPollModel } from '../../interfaces/polls';
import { IPostModel } from '../../interfaces/posts';
import { IError } from '../../interfaces/common';

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        signOut: () => dispatch(actions.logoutUser()),
        receivePolls: (polls: Array<IPollModel>) => dispatch(actions.receivePolls(polls)),
        requestPolls: () => dispatch(actions.requestPolls()),
        requestPosts: () => dispatch(actions.requestPosts()),
        receivePosts: (json: Array<IPostModel>) => dispatch(actions.receivePosts(json)),
        logPollsError: (error: any) => dispatch(actions.logPollsError(error)),
        logAccountError: (error: any) => dispatch(actions.logAccountError(error)),
        logPostError: (err: IError) => dispatch(actions.logPostError(err))
    }
};

export default withRouter<any>(connect(postLayoutStateProps, mapDispatchToProps, mergeProps)(PostLayout));