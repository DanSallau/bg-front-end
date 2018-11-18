
export interface ICommentModel {
    id?: number,
    comment?: string,
    dislikesCount?: number,
    likesCount?: number,
    createdOn?: string,
    userId: number,
    postId?: number,
    User?: {
        id: number,
        commentBy?: string,
    },
    voteType?: string,
    CommentVotes?: Array<ICommentVote>,
    flag?: boolean,
    disLikedByMe?: boolean,
    likedByMe?: boolean
}
export interface ICommentVote {
    type: string,
    commentId: number,
    userId: number,
}
export interface IPostVote {
    type: string,
    postId: number,
    userId: number,
}
export interface IPostModel {
    id?: number,
    title?: string,
    post?: string,
    postSummary? :string,
    createdOn?: string,
    receivedAt?: string,
    viewsCount?: number,
    likesCount?: number,
    dislikesCount?: number,
    createdAt?: string,
    updatedAt?: string,
    userId?: number,
    categoryItemId?: number,
    User?: {
        firstName: string,
        lastName: string
    },
    Comments?: Array<ICommentModel>,
    PostVotes?: Array<IPostVote>,
    voteType?: string,
    flag?: boolean,
    disLikedByMe?: boolean,
    likedByMe?: boolean
}