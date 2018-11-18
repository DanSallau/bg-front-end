import { createSelector, createStructuredSelector } from 'reselect';
import { IPostModel, ICommentModel } from '../interfaces/posts';
import { IAccountState } from '../interfaces/account';

import * as _ from 'lodash';

const posts = (state, ownProps) => state.posts;

const routeProps = (state, ownProps) => ownProps;

const account: any = (state, ownProps) => state.account;

const selectedPost = createSelector(
    [posts, routeProps, account],
    (postList, props, accountDetail: IAccountState) => {
        const selectedPost: IPostModel = postList.items.find((post: IPostModel, index: number) =>
            post.id == props.match.params.postId
        );
        if (!selectedPost) return;
        return {
            ...selectedPost,
            likesCount: selectedPost.PostVotes.filter(v => v.postId === selectedPost.id && v.type === 'UP').length,
            dislikesCount: selectedPost.PostVotes.filter(v => v.postId === selectedPost.id && v.type === 'DOWN').length,
            likedByMe: selectedPost.PostVotes.some(v => (v.postId === selectedPost.id && v.type === 'UP' && v.userId === accountDetail.user.id)),
            disLikedByMe: selectedPost.PostVotes.some(v => (v.postId === selectedPost.id && v.type === 'DOWN' && v.userId === accountDetail.user.id)),
            flag: selectedPost.PostVotes.some(v => v.postId === selectedPost.id && v.type === 'FLAG' && v.userId === accountDetail.user.id),
        }
    }
)

const comments = createSelector(
    [posts, routeProps, account],
    (postList, props, accountDetail: IAccountState) => {
        const commentList: IPostModel = postList.items.find((post: IPostModel, index: number) =>
            post.id == props.match.params.postId
        ).Comments.map((c: ICommentModel, i) => ({
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