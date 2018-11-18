import TopicComponent from '../../components/Topic/TopicComponent';
import {withRouter} from 'react-router-dom';

import {mergeProps} from '../../utils';

import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import * as actions from '../../actions';
import viewTopicSelectors from '../../selectors/viewTopicSelectors';
import { IPostModel } from '../../interfaces/posts';

const mapDispatchToProps = (dispatch : Dispatch <any>) => {
    return {
         getPosts: () => dispatch(actions.fetchPostsIfNeeded()),
         requestComment: () => dispatch(actions.requestComment()),
         logCommentError: (err: any) => dispatch(actions.logCommentError(err)),
         receivePosts: (json: Array<IPostModel>) => dispatch(actions.receivePosts(json))
    }
};

export default withRouter < any> (connect(viewTopicSelectors, mapDispatchToProps, mergeProps)(TopicComponent));