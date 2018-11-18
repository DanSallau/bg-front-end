import { withRouter } from 'react-router-dom';

import { mergeProps } from '../../utils';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as actions from '../../actions';
import NewPostComponent from '../../components/NewPost/NewPostComponent';
import newPostSelectors from '../../selectors/newPostSelectors';
import { IPostModel } from '../../interfaces/posts';
import { IError } from '../../interfaces/common';


const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        signOut: () => dispatch(actions.logoutUser()),
        tryAuth: (token: string) => dispatch(actions.tryAuth(token)),
        logAccountError: (error: IError) => dispatch(actions.logAccountError(error)),
        logReturnUrl: (returnUrl: string) => dispatch(actions.logReturnUrl(returnUrl)),
        requestPosts: () => dispatch(actions.requestPosts()),
        receivePosts: (json: Array<IPostModel>) => dispatch(actions.receivePosts(json))
    }
};

export default withRouter<any>(connect(newPostSelectors, mapDispatchToProps, mergeProps)(NewPostComponent));