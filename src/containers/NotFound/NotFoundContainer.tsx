import NotFoundComponent from '../../components/NotFound/NotFoundComponent';
import {withRouter} from 'react-router-dom';

import {mergeProps} from '../../utils';

import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import * as actions from '../../actions';

// import AppSelectors from '../selectors/AppSelectors';

const mapStateToProps = (state, ownProps) => {
    return {
        posts: state.posts
    }
}

const mapDispatchToProps = (dispatch : Dispatch <any>) => {
    return {
         getPosts: () => dispatch(actions.fetchPostsIfNeeded()),
        // setSelectedLanguage: (language: string) =>
        // dispatch(actions.setSelectedLanguage(language))
    }
};

export default withRouter < any> (connect(mapStateToProps, mapDispatchToProps, mergeProps)(NotFoundComponent));