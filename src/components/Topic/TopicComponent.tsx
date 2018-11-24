import * as React from 'react';
import { IPostModel, ICommentModel } from '../../interfaces/posts';
import { Location } from 'history';
import { ReactHistory } from '../../models/reduxModel';

import * as quill from "quill";

import { Redirect } from 'react-router-dom';

import { match } from "react-router";

// import * as FormData from 'form-data';
import { CommentApi } from '../../apis/comment.api';
import { PostApi } from '../../apis/post.api';
import HtmlParser from '../shared/htmlParser/HtmlParserComponent';
import { FormattedTime, FormattedDate, FormattedNumber } from 'react-intl';
import { IError } from '../../interfaces/common';

import { QuillEditorComponent } from '../shared/quillEditor/QuillEditorComponent';

const Quill = (quill as any).default ? (quill as any).default : quill;

interface ITopicState {
    // postDeltas: any,
}

export interface ITopicProps {
    selectedPost: IPostModel;
    comments: Array<ICommentModel>;
    getSelectedPost: (id: number) => void;
    account: any,
    logAccountError: (error: IError) => void;
    logReturnUrl: (returnUrl: string) => void;
    history: ReactHistory;
    location: Location;
    logCommentError: (message: string) => void;
    receivePost: (json: IPostModel) => void;
    requestComment: () => void;
    requestPost: () => void;
    match: match<any>;
    receiveComment: () => void;
}

export default class TopicComponent extends React.PureComponent<ITopicProps, ITopicState> {
    private api: CommentApi;
    private postApi: PostApi;

    constructor(props: ITopicProps) {
        super(props);
        this.api = new CommentApi();
        this.postApi = new PostApi();

        this.handleCreateComment = this.handleCreateComment.bind(this);

        this.handleReplyClick = this.handleReplyClick.bind(this);

        this.handleShareClick = this.handleShareClick.bind(this);

        this.handleReplyPostClick = this.handleReplyPostClick.bind(this);
        this.handleSharePostClick = this.handleSharePostClick.bind(this);

        this.handlePostDislike = this.handlePostDislike.bind(this);
        this.handlePostLike = this.handlePostLike.bind(this);
        this.handlePostFlag = this.handlePostFlag.bind(this);

        this.handleCommentDislike = this.handleCommentDislike.bind(this);
        this.handleCommentLike = this.handleCommentLike.bind(this);
        this.handleCommentFlag = this.handleCommentFlag.bind(this);
    }

    componentDidMount() {
        this.props.getSelectedPost(this.props.match.params.postId);
    }

    handlePostFlag(e: React.MouseEvent<HTMLElement>, id: number): void {
        const { requestPost, account, receivePost, logCommentError } = this.props;

        const post: IPostModel = {
            id: id,
            voteType: 'FLAG',
            userId: account.user.id,
        };

        const mobileChoice = document.getElementById('editorMobile');
        const desktopChoice = document.getElementById('editor');
        let editor;

        if (mobileChoice.offsetParent) {
            editor = new Quill(mobileChoice);
        } else if (desktopChoice.offsetParent) {
            editor = new Quill(desktopChoice);
        }

        requestPost();

        this.postApi.flagPost(post, account.token).then((response) => {
            if (response.status === 200) {
                receivePost(response.data);
                editor.setText('');
            }
        }).catch((err) => {
            logCommentError(err);
        });

        e.preventDefault();
    }

    handlePostLike(e: React.MouseEvent<HTMLElement>): void {
        const { requestPost, account, receivePost, logCommentError } = this.props;

        const post: IPostModel = {
            id: Number(e.currentTarget.id),
            voteType: 'UP',
            userId: account.user.id,
        };

        const mobileChoice = document.getElementById('editorMobile');
        const desktopChoice = document.getElementById('editor');
        let editor;

        if (mobileChoice.offsetParent) {
            editor = new Quill(mobileChoice);
        } else if (desktopChoice.offsetParent) {
            editor = new Quill(desktopChoice);
        }

        requestPost();

        this.postApi.castPostVote(post, account.token).then((response) => {
            if (response.status === 200) {
                receivePost(response.data);
                editor.setText('');
            }
        }).catch((err) => {
            logCommentError(err);
        });

        e.preventDefault();
    }

    handlePostDislike(e: React.MouseEvent<HTMLElement>) {

        const { requestPost, account, receivePost, logCommentError } = this.props;

        const post: IPostModel = {
            id: Number(e.currentTarget.id),
            voteType: 'DOWN',
            userId: account.user.id,
        };

        const mobileChoice = document.getElementById('editorMobile');
        const desktopChoice = document.getElementById('editor');
        let editor;

        if (mobileChoice.offsetParent) {
            editor = new Quill(mobileChoice);
        } else if (desktopChoice.offsetParent) {
            editor = new Quill(desktopChoice);
        }

        requestPost();

        this.postApi.castPostVote(post, account.token).then((response) => {
            if (response.status === 200) {
                receivePost(response.data);
                editor.setText('');
            }
        }).catch((err) => {
            logCommentError(err);
        });

        e.preventDefault();
        e.stopPropagation();

    }

    handleCommentFlag(e: React.MouseEvent<HTMLElement>): void {

        const { requestComment, account, receivePost, logCommentError, receiveComment, selectedPost } = this.props;

        const comment: ICommentModel = {
            id: Number(e.currentTarget.id),
            voteType: 'FLAG',
            userId: account.user.id,
            postId: selectedPost.id
        };

        const mobileChoice = document.getElementById('editorMobile');
        const desktopChoice = document.getElementById('editor');
        let editor;

        if (mobileChoice.offsetParent) {
            editor = new Quill(mobileChoice);
        } else if (desktopChoice.offsetParent) {
            editor = new Quill(desktopChoice);
        }

        requestComment();

        this.api.flagComment(comment, account.token).then((response) => {
            if (response.status === 200) {
                receivePost(response.data);
                receiveComment();
                editor.setText('');
            }
        }).catch((err) => {
            logCommentError(err);
        });

        e.preventDefault()
    }


    handleCommentLike(e: React.MouseEvent<HTMLElement>): void {

        const { requestComment, account, receivePost, logCommentError, receiveComment, selectedPost } = this.props;
        const mobileChoice = document.getElementById('editorMobile');
        const desktopChoice = document.getElementById('editor');
        let editor;

        if (mobileChoice.offsetParent) {
            editor = new Quill(mobileChoice);
        } else if (desktopChoice.offsetParent) {
            editor = new Quill(desktopChoice);
        }

        const comment: ICommentModel = {
            id: Number(e.currentTarget.id),
            voteType: 'UP',
            userId: account.user.id,
            postId: selectedPost.id
        };

        requestComment();

        this.api.castCommentVote(comment, account.token).then((response) => {
            if (response.status === 200) {
                receivePost(response.data);
                receiveComment();
                editor.setText('');
            }
        }).catch((err) => {
            logCommentError(err);
        });

        e.preventDefault()
    }

    handleCommentDislike(e: React.MouseEvent<HTMLElement>) {
        const { requestComment, account, receivePost, logCommentError, receiveComment, selectedPost } = this.props;

        const mobileChoice = document.getElementById('editorMobile');
        const desktopChoice = document.getElementById('editor');
        let editor;

        if (mobileChoice.offsetParent) {
            editor = new Quill(mobileChoice);
        } else if (desktopChoice.offsetParent) {
            editor = new Quill(desktopChoice);
        }

        const comment: ICommentModel = {
            id: Number(e.currentTarget.id),
            voteType: 'DOWN',
            userId: account.user.id,
            postId: selectedPost.id
        };

        requestComment();

        this.api.castCommentVote(comment, account.token).then((response) => {
            if (response.status === 200) {
                receivePost(response.data);
                receiveComment();
                editor.setText('');
            }
        }).catch((err) => {
            logCommentError(err);
        });
        e.stopPropagation();
        e.preventDefault()
    }

    handleCreateComment(e: React.FormEvent<HTMLElement>) {
        const { selectedPost, account, requestComment, receivePost, logCommentError, receiveComment } = this.props;

        const mobileChoice = document.getElementById('editorMobile');
        const desktopChoice = document.getElementById('editor');
        let editor;

        if (mobileChoice.offsetParent) {
            editor = new Quill(mobileChoice);
        } else if (desktopChoice.offsetParent) {
            editor = new Quill(desktopChoice);
        }
        const comment: ICommentModel = {
            comment: editor.root.innerHTML,
            postId: selectedPost.id,
            userId: account.user.id
        };

        requestComment();

        this.api.createComment(comment, account.token).then((response) => {
            if (response.status === 200) {
                receivePost(response.data);
                receiveComment();
                editor.setText('');
            }
        }).catch((err) => {
            logCommentError(err);
        });

        e.preventDefault();
    }

    handleShareClick(e: React.MouseEvent<HTMLElement>, id: number) {

        const { selectedPost, requestComment, receivePost, account, logCommentError, receiveComment } = this.props;
        const selectedComment = selectedPost.Comments.find(comment => comment.id === id);
        const newComment: ICommentModel = {
            comment: ` <blockquote> <span class="original">Asalin Marubuci - ${selectedComment.User.commentBy} :</span> ${selectedComment.comment} </blockquote>`,
            postId: selectedPost.id,
            userId: account.user.id
        }


        requestComment();
        if (selectedComment) {
            this.api.createComment(newComment, account.token).then((response) => {
                if (response.status === 200) {
                    receivePost(response.data);
                    receiveComment();
                }
            }).catch((err) => {
                logCommentError(err);
            });
        }

        e.preventDefault();
    }

    handleReplyPostClick(e: React.MouseEvent<HTMLElement>) {
        const mobileChoice = document.getElementById('editorMobile');
        const desktopChoice = document.getElementById('editor');
        let editor;

        if (mobileChoice.offsetParent) {
            editor = new Quill(mobileChoice);
        } else if (desktopChoice.offsetParent) {
            editor = new Quill(desktopChoice);
        }
        editor.focus();
        e.preventDefault();
    }

    handleSharePostClick(e: React.MouseEvent<HTMLElement>) {
        const { selectedPost, requestPost, receivePost, account, logCommentError } = this.props;
        const newComment: ICommentModel = {
            comment: ` <blockquote> <span class="original">Asalin Marubuci - ${selectedPost.User.lastName} :</span> ${selectedPost.post} </blockquote>`,
            postId: selectedPost.id,
            userId: account.user.id
        }


        requestPost();
        if (selectedPost) {
            this.api.createComment(newComment, account.token).then((response) => {
                try {
                } catch (err) { console.log(err) };
                if (response.status === 200) {
                    receivePost(response.data);
                }
            }).catch((err) => {
                logCommentError(err);
            });
        }

        e.preventDefault();
    }

    handleReplyClick(e: React.MouseEvent<HTMLElement>, id: number) {
        const { selectedPost, account } = this.props;
        const selectedComment = selectedPost.Comments.find(comment => comment.id === id);
        const newComment: ICommentModel = {
            comment: `<blockquote> <span class="original">Asalin Marubuci - ${selectedComment.User.commentBy} :</span> ${selectedComment.comment} </blockquote>`,
            postId: selectedPost.id,
            userId: account.user.id
        };

        const mobileChoice = document.getElementById('editorMobile');
        const desktopChoice = document.getElementById('editor');
        let editor;

        if (mobileChoice.offsetParent) {
            editor = new Quill(mobileChoice);
        } else if (desktopChoice.offsetParent) {
            editor = new Quill(desktopChoice);
        }


        editor.pasteHTML(0, newComment.comment);

        editor.focus();

        e.preventDefault();
    }

    render() {
        const { selectedPost, comments } = this.props;

        const { account } = this.props;
        console.log("There are changes ", selectedPost);
        if (account.error && account.error.message && !account.isAuthenticated) {
            return <Redirect to={'signin'} />
        }
        return (
            this.props.selectedPost ?
                <div className="topic-container">
                    <div className="post">
                        <div className="topwrap">
                            <div className="userinfo pull-left">
                                <div className="avatar">
                                    <img src={require('../../styles/images/avatar.jpg')} alt="" />

                                    <div className="status green">&nbsp;</div>
                                </div>

                                <div className="icons">
                                    <img src={require('../../styles/images/icon1.jpg')} alt="" />
                                    <img src={require('../../styles/images/icon4.jpg')} alt="" />
                                    <img src={require('../../styles/images/icon5.jpg')} alt="" />
                                    <img src={require('../../styles/images/icon6.jpg')} alt="" />
                                </div>
                            </div>
                            <div className="posttext pull-left">
                                <h2>{selectedPost.title}</h2>
                                <HtmlParser htmlString={selectedPost.post} />


                                <a href="#" className="commnterBy-container">
                                    <i className="fa fa-user"></i>{selectedPost.User.lastName} </a>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                        <div className="postinfobot">

                            <div className="likeblock pull-left">
                                <a href="#" className={"up" + (selectedPost.likedByMe ? ' liked-by-me' : '')}>
                                    <i className="fa fa-thumbs-o-up" id={selectedPost.id.toString()}
                                        onClick={this.handlePostLike}></i>{selectedPost.likesCount}</a>
                                <a href="#" className={"down" + (selectedPost.disLikedByMe ? ' disliked-by-me' : '')}>
                                    <i className="fa fa-thumbs-o-down" id={selectedPost.id.toString()}
                                        onClick={this.handlePostDislike}></i>{selectedPost.dislikesCount}</a>
                            </div>

                            <div className="prev pull-left">
                                <a href="#">
                                    <i className="fa fa-reply" onClick={this.handleReplyPostClick}></i>
                                </a>
                            </div>

                            <div className="posted pull-left">
                                <i className="fa fa-clock-o"></i>
                                An rubuta :
                                <FormattedDate
                                    value={selectedPost.createdOn}
                                    day="2-digit"
                                    month="short"
                                    year="2-digit"
                                />
                                @
                                <FormattedTime
                                    value={selectedPost.createdOn}
                                    hour="numeric"
                                    hour12={false}
                                    minute="numeric"
                                />
                            </div>

                            <div className="next pull-right">
                                <a href="#">
                                    <i className="fa fa-share" onClick={this.handleSharePostClick}></i>
                                </a>

                                <a href="#" className={selectedPost.flag ? 'flag-by-me' : ''}>
                                    <i className={'fa fa-flag'} onClick={(e) => this.handlePostFlag(e, selectedPost.id)}></i>
                                </a>
                            </div>

                            <div className="clearfix"></div>
                        </div>
                    </div>

                    {comments.map(comment =>
                        <div className="post" key={comment.id}>
                            <div className="topwrap">
                                <div className="userinfo pull-left">
                                    <div className="avatar">
                                        <img src={require('../../styles/images/avatar2.jpg')} alt={comment.User.commentBy} />
                                        <div className="status red">&nbsp;</div>
                                    </div>

                                    <div className="icons">
                                        <img src={require('../../styles/images/icon3.jpg')} alt="" />
                                        <img src={require('../../styles/images/icon4.jpg')} alt="Girma" />
                                        <img src={require('../../styles/images/icon5.jpg')} alt="Matsayi" />
                                        <img src={require('../../styles/images/icon6.jpg')} alt="Matsayi" />
                                    </div>
                                </div>
                                <div className="posttext pull-left">
                                    <HtmlParser htmlString={comment.comment} />

                                    <a href="#" className="commnterBy-container">
                                        <i className="fa fa-user"></i>{comment.User.commentBy} </a>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="postinfobot">

                                <div className="likeblock pull-left">
                                    <a href="#" className={"up" + (comment.likedByMe ? ' liked-by-me' : '')}>
                                        <i className="fa fa-thumbs-o-up" id={comment.id.toString()}
                                            onClick={this.handleCommentLike}></i><FormattedNumber value={comment.likesCount} /></a>
                                    <a href="#" className={"down" + (comment.disLikedByMe ? " disliked-by-me" : "")}>
                                        <i className="fa fa-thumbs-o-down" id={comment.id.toString()}
                                            onClick={this.handleCommentDislike}></i><FormattedNumber value={comment.dislikesCount} /></a>
                                </div>

                                <div className="prev pull-left">
                                    <a href="#">
                                        <i className="fa fa-reply" onClick={e => this.handleReplyClick(e, comment.id)}></i>
                                    </a>
                                </div>

                                <div className="posted pull-left">
                                    <i className="fa fa-clock-o"></i>
                                    An wallafa : <FormattedDate value={comment.createdOn} day="2-digit" month="short" year="2-digit" />  @  <FormattedTime value={comment.createdOn} hour="numeric" hour12={false} minute="numeric" />
                                </div>

                                <div className="next pull-right">
                                    <a href="#">
                                        <i className="fa fa-share" onClick={e => this.handleShareClick(e, comment.id)}></i>
                                    </a>

                                    <a href="#" className={comment.flag ? 'flag-by-me' : ''}>
                                        <i className={'fa fa-flag'} id={comment.id.toString()} onClick={this.handleCommentFlag}></i>
                                    </a>
                                </div>

                                <div className="clearfix"></div>
                            </div>
                        </div>
                    )}

                    <div className="post">
                        <form className="form" onSubmit={this.handleCreateComment}>
                            <div className="topwrap">
                                <div className="userinfo pull-left">
                                    <div className="avatar">
                                        <img src={require('../../styles/images/avatar4.jpg')} alt="" />

                                        <div className="status red">&nbsp;</div>
                                    </div>

                                    <div className="icons">
                                        <img src={require('../../styles/images/icon3.jpg')} alt="" />

                                        <img src={require('../../styles/images/icon4.jpg')} alt="" />
                                        <img src={require('../../styles/images/icon5.jpg')} alt="" />
                                        <img src={require('../../styles/images/icon6.jpg')} alt="" />
                                    </div>
                                </div>
                                <div className="posttext pull-left">
                                    <QuillEditorComponent
                                        account={this.props.account}
                                        logCommentError={this.props.logCommentError}
                                        requestComment={this.props.requestComment}
                                        receiveComment={this.props.receiveComment}
                                    ></QuillEditorComponent>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="postinfobot">

                                <div className="notechbox pull-left">
                                    <input type="checkbox" name="note" id="note" className="form-control" />
                                </div>

                                <div className="pull-left">
                                    <label htmlFor="note">
                                        Email me when some one post a reply</label>
                                </div>

                                <div className="pull-right postreply">
                                    <div className="pull-left smile">
                                        <a href="#">
                                            <i className="fa fa-smile-o"></i>
                                        </a>
                                    </div>
                                    <div className="pull-left">
                                        <button type="submit" className="btn btn-primary">Post Reply</button>
                                    </div>
                                    <div className="clearfix"></div>
                                </div>

                                <div className="clearfix"></div>
                            </div>
                        </form>
                    </div>

                </div>
                :
                null
        )
    }
}