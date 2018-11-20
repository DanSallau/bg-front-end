import { createSelector, createStructuredSelector } from 'reselect';
import { IPostModel, ICommentModel } from '../interfaces/posts';
import { IAccountState } from '../interfaces/account';

import * as _ from 'lodash';

const post = (state, ownProps) => state.selectedPost;

const account: any = (state, ownProps) => state.account;

const routeProps = (state, ownProps) => ownProps;

const selectedPost = createSelector(
    [post, account],
    (selectedPost, accountDetail: IAccountState) => {
        const postItem = selectedPost.post
        if (!postItem.PostVotes) return;
        return {
            ...postItem,
            likesCount: postItem.PostVotes.filter(v => v.postId === postItem.id && v.type === 'UP').length,
            dislikesCount: postItem.PostVotes.filter(v => v.postId === postItem.id && v.type === 'DOWN').length,
            likedByMe: postItem.PostVotes.some(v => (v.postId === postItem.id && v.type === 'UP' && v.userId === accountDetail.user.id)),
            disLikedByMe: postItem.PostVotes.some(v => (v.postId === postItem.id && v.type === 'DOWN' && v.userId === accountDetail.user.id)),
            flag: postItem.PostVotes.some(v => v.postId === postItem.id && v.type === 'FLAG' && v.userId === accountDetail.user.id),
        }
    }
)

const comments = createSelector(
    [post, account],
    (selectedPost: any, accountDetail: IAccountState) => {
        const postItem = selectedPost.post;
        if (!postItem.Comments) return;
        const commentList: Array<ICommentModel> = postItem.Comments.map((c: ICommentModel, i) => ({
            ...c,
            likesCount: c.CommentVotes.filter(v => v.commentId === c.id && v.type === 'UP').length,
            dislikesCount: c.CommentVotes.filter(v => (v.commentId === c.id && v.type === 'DOWN')).length,
            likedByMe: c.CommentVotes.some(v => (v.commentId === c.id && v.type === 'UP' && v.userId === accountDetail.user.id)),
            disLikedByMe: c.CommentVotes.some(v => (v.commentId === c.id && v.type === 'DOWN' && v.userId === accountDetail.user.id)),
            flag: c.CommentVotes.some(v => (v.commentId === c.id && v.type === 'FLAG' && v.userId === accountDetail.user.id)),
        }));
        return commentList;
    }
)

export default createStructuredSelector({
    selectedPost,
    comments,
    account,
    ...routeProps
})