import * as React from 'react';
import { IPostModel, ICommentModel } from '../../interfaces/posts';
import { Location } from 'history';
import { ReactHistory } from '../../models/reduxModel';

import * as quill from "quill";

import { AxiosResponse } from 'axios';
import { Redirect } from 'react-router-dom';

import { match } from "react-router";

// import * as FormData from 'form-data';
import { CommentApi } from '../../apis/comment.api';
import { PostApi } from '../../apis/post.api';
import HtmlParser from '../shared/htmlParser/HtmlParserComponent';
import { FormattedTime, FormattedDate, FormattedNumber } from 'react-intl';
import { IError } from '../../interfaces/common';
// import { Delta }  from 'quill-delta';
const Delta = require('quill-delta');

const Quill = (quill as any).default ? (quill as any).default : quill;
// const Delta = (delta as any).default ? (delta as any).default : quill;
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
    requestComment: () => void,
    match: match<any>;
}

export default class TopicComponent extends React.PureComponent<ITopicProps, ITopicState> {
    private editor: quill.Quill;
    private api: CommentApi;
    private postApi: PostApi;
    private Quill = (quill as any).default ? (quill as any).default : quill;

    constructor(props: ITopicProps) {
        super(props);
        this.api = new CommentApi();
        this.postApi = new PostApi();

        this.handleCreateComment = this.handleCreateComment.bind(this);
        this.handleDeltaStateChange = this.handleDeltaStateChange.bind(this);

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


    async componentWillMount() {
        const { account } = this.props;
/*
        if (!account.user || !account.token || !account.isAuthenticated) {
            this.props.logReturnUrl(this.props.location.pathname)
            this.props.logAccountError({ type: 'account', message: 'Please log in to proceed' });
            this.props.history.push('signin');
        }*/
    }

    saveToServer(file: File) {
        const fd = new FormData();
        const { account, requestComment, logCommentError } = this.props;
        fd.append('albumName', 'posts');
        fd.append('image', file);
        const axiosConfig = { headers: { 'Content-Type': 'application/form-data' } };

        requestComment();
        this.api.uploadImage(fd, account.token)
            .then((response: AxiosResponse) => {
                if (response.status === 200) {
                    const url = response.data.url;
                    this.insertToEditor(url);
                }
            })
            .catch(err => {
                console.log("Upload image failed ", err);
                logCommentError(err);
            })
    }

    insertToEditor(url: string) {
        const range = this.editor.getSelection();
        if (range) {
            this.editor.insertEmbed(range.index, 'image', url);
        }

    }

    linkhandler(value: any) {
        if (value) {
            var href = prompt('Enter the URL');
            this.editor.format('link', href);
        } else {
            this.editor.format('link', false);
        }
    }

    handleDeltaStateChange(delta: Object, oldDelta: Object, source: string) {
        if (source == 'api') {
            console.log("An API call triggered this change.");
        } else if (source == 'user') {
            // this.setState({ postDeltas: delta });
        }

        console.log("There is a change and is ", delta);
    }

    componentDidMount() {
        this.props.getSelectedPost(this.props.match.params.postId);

        const toolbarOptions = [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            ['image', 'link', 'bullet', 'indent'],
            [{ 'color': [] }, { 'background': [] }],
        ];

        const mobileOptions = [
            ['image'],
        ];

        const mobileChoice = document.getElementById('editorMobile');
        const desktopChoice = document.getElementById('editor');
        if(!mobileChoice && !desktopChoice) return;
        if (mobileChoice.offsetParent) {
            this.editor = new Quill(mobileChoice, {
                modules: {
                    toolbar: mobileOptions

                },
                placeholder: 'Kayi rubutu anan...',
                theme: 'snow',
            });
        } else if (desktopChoice.offsetParent) {
            this.editor = new Quill(desktopChoice, {
                modules: {
                    toolbar: toolbarOptions

                },
                placeholder: 'Kayi rubutu anan...',
                theme: 'snow',
            });
        }

        this.editor.getModule('toolbar').addHandler('image', this.handleUploadImage.bind(this));
        this.editor.getModule('toolbar').addHandler('link', this.linkhandler.bind(this));


        this.editor.on('text-change', this.handleDeltaStateChange);

        this.editor.root.innerHTML = "";

    }

    handleUploadImage() {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.click();
        // Listen upload local image and save to server
        input.onchange = () => {
            const file = input.files[0];

            // file type is only image.
            if (/^image\//.test(file.type)) {
                console.log(this);
                this.saveToServer(file);
            } else {
                console.warn('You could only upload images.');
            }
        };
    }

    handlePostFlag(e: React.MouseEvent<HTMLElement>, id: number): void {
        const { requestComment, account, receivePost, logCommentError } = this.props;

        const post: IPostModel = {
            id: id,
            voteType: 'FLAG',
            userId: account.user.id,
        };

        requestComment();

        this.postApi.flagPost(post, account.token).then((response) => {
            if (response.status === 200) {
                receivePost(response.data);
                this.editor.setText('');
            }
        }).catch((err) => {
            logCommentError(err);
        });

        e.preventDefault();
    }

    handlePostLike(e: React.MouseEvent<HTMLElement>): void {
        const { requestComment, account, receivePost, logCommentError } = this.props;

        const post: IPostModel = {
            id: Number(e.currentTarget.id),
            voteType: 'UP',
            userId: account.user.id,
        };

        requestComment();

        this.postApi.castPostVote(post, account.token).then((response) => {
            if (response.status === 200) {
                receivePost(response.data);
                this.editor.setText('');
            }
        }).catch((err) => {
            logCommentError(err);
        });

        e.preventDefault();
    }

    handlePostDislike(e: React.MouseEvent<HTMLElement>) {

        const { requestComment, account, receivePost, logCommentError } = this.props;

        const post: IPostModel = {
            id: Number(e.currentTarget.id),
            voteType: 'DOWN',
            userId: account.user.id,
        };

        requestComment();

        this.postApi.castPostVote(post, account.token).then((response) => {
            if (response.status === 200) {
                receivePost(response.data);
                this.editor.setText('');
            }
        }).catch((err) => {
            logCommentError(err);
        });

        e.preventDefault();
        e.stopPropagation();

    }

    handleCommentFlag(e: React.MouseEvent<HTMLElement>): void {

        const { requestComment, account, receivePost, logCommentError } = this.props;

        const comment: ICommentModel = {
            id: Number(e.currentTarget.id),
            voteType: 'FLAG',
            userId: account.user.id,
        };

        requestComment();

        this.api.flagComment(comment, account.token).then((response) => {
            if (response.status === 200) {
                receivePost(response.data);
                this.editor.setText('');
            }
        }).catch((err) => {
            logCommentError(err);
        });

        e.preventDefault()
    }


    handleCommentLike(e: React.MouseEvent<HTMLElement>): void {

        const { requestComment, account, receivePost, logCommentError } = this.props;

        const comment: ICommentModel = {
            id: Number(e.currentTarget.id),
            voteType: 'UP',
            userId: account.user.id,
        };

        requestComment();

        this.api.castCommentVote(comment, account.token).then((response) => {
            if (response.status === 200) {
                receivePost(response.data);
                this.editor.setText('');
            }
        }).catch((err) => {
            logCommentError(err);
        });

        e.preventDefault()
    }

    handleCommentDislike(e: React.MouseEvent<HTMLElement>) {
        const { requestComment, account, receivePost, logCommentError } = this.props;

        const comment: ICommentModel = {
            id: Number(e.currentTarget.id),
            voteType: 'DOWN',
            userId: account.user.id,
        };

        requestComment();

        this.api.castCommentVote(comment, account.token).then((response) => {
            if (response.status === 200) {
                receivePost(response.data);
                this.editor.setText('');
            }
        }).catch((err) => {
            logCommentError(err);
        });

        e.preventDefault()
    }

    handleCreateComment(e: React.FormEvent<HTMLElement>) {
        const { selectedPost, account, requestComment, receivePost, logCommentError } = this.props;

        const comment: ICommentModel = {
            comment: this.editor.root.innerHTML,
            postId: selectedPost.id,
            userId: account.user.id
        };

        requestComment();

        this.api.createComment(comment, account.token).then((response) => {
            if (response.status === 200) {
                receivePost(response.data);
                this.editor.setText('');
            }
        }).catch((err) => {
            logCommentError(err);
        });

        e.preventDefault();
    }

    handleShareClick(e: React.MouseEvent<HTMLElement>, id: number) {

        const { selectedPost, requestComment, receivePost, account, logCommentError } = this.props;
        const selectedComment = selectedPost.Comments.find(comment => comment.id === id);
        const h = <FormattedDate value={selectedComment.createdOn} day="2-digit" month="short" year="2-digit" />;
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
                }
            }).catch((err) => {
                logCommentError(err);
            });
        }

        e.preventDefault();
    }

    handleReplyPostClick(e: React.MouseEvent<HTMLElement>) {
        this.editor.focus();
        e.preventDefault();
    }

    handleSharePostClick(e: React.MouseEvent<HTMLElement>) {
        const { selectedPost, requestComment, receivePost, account, logCommentError } = this.props;
        const h = <FormattedDate value={selectedPost.createdOn} day="2-digit" month="short" year="2-digit" />;
        const newComment: ICommentModel = {
            comment: ` <blockquote> <span class="original">Asalin Marubuci - ${selectedPost.User.lastName} :</span> ${selectedPost.post} </blockquote>`,
            postId: selectedPost.id,
            userId: account.user.id
        }


        requestComment();
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
        }

        let range = this.editor.getSelection();

        this.editor.pasteHTML(0, newComment.comment);

        this.editor.focus();

        e.preventDefault();
    }

    render() {
        const { selectedPost, comments } = this.props;
        console.log(selectedPost);

        const { account } = this.props;

        if (account.error && account.error.message && !account.isAuthenticated) {
            return <Redirect to={'signin'} />
        }
        return (
            this.props.selectedPost ? <div className="topic-container">
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
                            An rubuta : <FormattedDate value={selectedPost.createdOn} day="2-digit" month="short" year="2-digit" />  @  <FormattedTime value={selectedPost.createdOn} hour="numeric" hour12={false} minute="numeric" />
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

                                <div className="hidden-xs">
                                    <div id="editor">
                                    </div>
                                </div>
                                <div className="hidden-sm hidden-md hidden-lg">
                                    <div id="editorMobile">
                                    </div>
                                </div>
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