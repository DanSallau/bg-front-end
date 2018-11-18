import * as React from 'react';
import { IPostModel } from '../../interfaces/posts';

import * as quill from "quill";
import { ReactHistory } from '../../models/reduxModel';
import axios, { AxiosResponse } from 'axios';
import config from '../../configs';
import * as FormData from 'form-data';
import { PostApi } from '../../apis/post.api';
import { IError } from '../../interfaces/common';


const Quill = (quill as any).default ? (quill as any).default : quill;

interface INewPostState {
    items: Array<IPostModel>
}

export interface INewPostProps {
    posts: INewPostState;
    account: any;
    categories: any;
    signOut: () => void;
    tryAuth: (token: string) => void;
    logAccountError: (error: IError) => void;
    logReturnUrl: (returnUrl: string) => void;
    createPost: (post: IPostModel) => void;
    requestPosts: () => void;
    receivePosts: (json: Array<IPostModel>) => void;
    history: ReactHistory;
    location: Location;
}

interface ICategoryItem {
    item: string;
    id: number;
}
interface ICategory {
    name: string;
    id: number;
    CategoryItems: Array<ICategoryItem>
}
interface IStateProps {
    post: string,
    postTitle: string,
    postCategory: string,
    postDeltas: any,
    selectedCategory: ICategory,
    selectedCategoryItemId: number;
}
export default class NewPostComponent extends React.PureComponent<INewPostProps, IStateProps> {
    private editor: quill.Quill;
    private mobileEditor: quill.Quill;
    private api: PostApi;

    constructor(props: INewPostProps) {
        super(props);
        this.state = {
            postDeltas: '',
            postTitle: '',
            postCategory: '',
            post: '',
            selectedCategory: {} as ICategory,
            selectedCategoryItemId: undefined
        };

        this.handleDeltaStateChange = this.handleDeltaStateChange.bind(this);
        this.handleUploadImage = this.handleUploadImage.bind(this);
        this.linkhandler = this.linkhandler.bind(this);

        this.handleCategoryItemChange = this.handleCategoryItemChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);

        this.handleCreatePost = this.handleCreatePost.bind(this);

        this.handleTitleChange = this.handleTitleChange.bind(this);

        this.api = new PostApi();
    }

    async componentWillMount() {
        const { account } = this.props;

        if (!account.user || !account.token || !account.isAuthenticated) {
            this.props.logReturnUrl(this.props.location.pathname)
            this.props.logAccountError({ type: 'account', message: 'Please log in to proceed' });
            this.props.history.push('signin');
        }
    }


    componentDidMount() {
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

        this.editor = new Quill(desktopChoice, {
            modules: {
                toolbar: toolbarOptions

            },
            placeholder: 'Kayi rubutu anan...',
            theme: 'snow',
        });

        this.mobileEditor = new Quill(mobileChoice, {
            modules: {
                toolbar: mobileOptions

            },
            placeholder: 'Kayi rubutu anan...',
            theme: 'snow',
        });

        this.editor.getModule('toolbar').addHandler('image', this.handleUploadImage);
        this.editor.getModule('toolbar').addHandler('link', this.linkhandler);

        this.mobileEditor.getModule('toolbar').addHandler('image', this.handleUploadImage);

        this.editor.on('text-change', this.handleDeltaStateChange);
        this.mobileEditor.on('text-change', this.handleDeltaStateChange);



    }

    saveToServer(file: File) {
        const fd = new FormData();
        fd.append('albumName', 'posts');
        fd.append('image', file);
        const axiosConfig = { headers: { 'Content-Type': 'application/form-data' } };

        axios.post(`${config.socket}/api/post/upload-image`, fd, axiosConfig)
            .then((response: AxiosResponse) => {
                if (response.status === 200) {
                    const url = response.data.url;
                    this.insertToEditor(url);
                }
            })
            .catch(err => {
                console.log("Upload image failed ", err);
            })
    }

    insertToEditor(url: string) {

        const range = this.editor.getSelection();
        const mobileRange = this.mobileEditor.getSelection();
        console.log('the link has arrive here and the bile too', range);
        if (range) {
            this.editor.insertEmbed(range.index, 'image', url);
        } else if (mobileRange) {
            this.mobileEditor.insertEmbed(mobileRange.index, 'image', url);
        }

    }

    handleUploadImage() {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.click();
        // Listen upload local image and save to server
        input.onchange = () => {
            const file = input.files[0];

            console.log("Mai arziki ", file);

            // file type is only image.
            if (/^image\//.test(file.type)) {
                this.saveToServer(file);
            } else {
                console.warn('You could only upload images.');
            }
        };
    }

    linkhandler(value: any) {
        console.log('the value is ', value)
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
            this.setState({ postDeltas: delta });
        }
    }

    handleCreatePost(e: React.FormEvent<HTMLElement>) {
        const { account, requestPosts, receivePosts } = this.props;
        const range = this.editor.getSelection();
        const post: IPostModel = {
            post: range ? this.editor.root.innerHTML : this.mobileEditor.root.innerHTML,
            title: this.state.postTitle,
            categoryItemId: this.state.selectedCategoryItemId,
            userId: account.user.id
        };

        requestPosts();
        setTimeout(() => {
            this.api.createPost(post, account.token).then((response) => {
                if (response.status === 200) {
                    //redirect to page or list 
                    receivePosts(response.data);
                    this.props.history.push('/');

                }
            }).catch((err) => {
                // logPost Error here
            })
        }, 5000);
        e.preventDefault();
    }

    handleCategoryItemChange(e: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({ selectedCategoryItemId: Number(e.target.value) });
    }

    handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const selectedCategory = this.props.categories.items.find(item => item.id === Number(e.target.value));
        this.setState({ selectedCategory: selectedCategory });
    }

    handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ postTitle: e.target.value });
    }

    render() {

        return (
            <div>

                <div className="post">
                    <form className="form newtopic" onSubmit={this.handleCreatePost}>
                        <div className="topwrap">
                            <div className="userinfo pull-left">
                                <div className="avatar">
                                    <img src={require('../../styles/images/avatar4.jpg')} alt="" />
                                    <div className="status red">&nbsp;</div>
                                </div>

                                <div className="icons">
                                    <img src={require('../../styles/images/icon3.jpg')} alt="" /><img src={require('../../styles/images/icon4.jpg')} alt="" />
                                    <img src={require('../../styles/images/icon5.jpg')} alt="" /><img src={require('../../styles/images/icon6.jpg')} alt="" />
                                </div>
                            </div>
                            <div className="posttext pull-left">

                                <div>
                                    <input type="text" placeholder="Enter Topic Title" className="form-control" onChange={this.handleTitleChange} />
                                </div>

                                <div className="row">
                                    <div className="col-lg-6 col-md-6">
                                        <select name="category" id="category" className="form-control" value={this.state.selectedCategory.id} defaultValue="select" onChange={this.handleCategoryChange}>
                                            <option value="select" disabled>Please select</option>
                                            {this.props.categories && this.props.categories.items.map(category =>
                                                <option value={category.id} key={category.id}>{category.name}</option>
                                            )}

                                        </select>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <select name="subcategory" id="subcategory" className="form-control" value={this.state.selectedCategoryItemId} onChange={this.handleCategoryItemChange}>
                                            <option defaultValue="" disabled selected>Select Subcategory</option>
                                            {this.state.selectedCategory.id && this.state.selectedCategory.CategoryItems.map((categoryItem: ICategoryItem) => {
                                                return (
                                                    <option value={categoryItem.id} key={categoryItem.id}>{categoryItem.item}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>

                                <div className="row quill">
                                    <div className="col-md-12 hidden-xs">
                                        <div id="editor">
                                            <p>Hello World!</p>
                                        </div>
                                    </div>
                                    <div className="col-xs-12 hidden-sm hidden-md hidden-lg">
                                        <div id="editorMobile">
                                            <p>Hello World!</p>
                                        </div>
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
                                    <input type="submit" className="btn btn-primary" value="Post" />
                                </div>
                                <div className="clearfix"></div>
                            </div>

                            <div className="clearfix"></div>
                        </div>
                    </form>
                </div>

                <div className="row similarposts">
                    <div className="col-lg-10">
                        <i className="fa fa-info-circle"></i>
                        <p>Similar Posts according to your
                            <a href="#">Topic Title</a>.</p>
                    </div>
                    <div className="col-lg-2 loading">
                        <i className="fa fa-spinner"></i>
                    </div>

                </div>

                <div className="post">
                    <div className="wrap-ut pull-left">
                        <div className="userinfo pull-left">
                            <div className="avatar">
                                <img src="images/avatar.jpg" alt="" />
                                <div className="status green">&nbsp;</div>
                            </div>

                            <div className="icons">
                                <img src={require('../../styles/images/icon1.jpg')} alt="" /><img src={require('../../styles/images/icon4.jpg')} alt="" />
                            </div>
                        </div>
                        <div className="posttext pull-left">
                            <h2>10 Kids Unaware of Their Halloween Costume</h2>
                            <p>It's one thing to subject yourself to a Halloween costume mishap because,
                                hey, that's your prerogative.</p>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                    <div className="postinfo pull-left">
                        <div className="comments">
                            <div className="commentbg">
                                560
                                <div className="mark"></div>
                            </div>

                        </div>
                        <div className="views">
                            <i className="fa fa-eye"></i>
                            1,568</div>
                        <div className="time">
                            <i className="fa fa-clock-o"></i>
                            24 min</div>
                    </div>
                    <div className="clearfix"></div>
                </div>

                <div className="post">
                    <div className="wrap-ut pull-left">
                        <div className="userinfo pull-left">
                            <div className="avatar">
                                <img src="images/avatar2.jpg" alt="" />
                                <div className="status red">&nbsp;</div>
                            </div>

                            <div className="icons">
                                <img src="images/icon3.jpg" alt="" /><img src={require('../../styles/images/icon4.jpg')} alt="" /><img src="images/icon5.jpg" alt="" /><img src="images/icon6.jpg" alt="" />
                            </div>
                        </div>
                        <div className="posttext pull-left">
                            <h2>What Instagram Ads Will Look Like</h2>
                            <p>Instagram offered a first glimpse at what its ads will look like in a blog
                                post Thursday. The sample ad, which you can see below.</p>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                    <div className="postinfo pull-left">
                        <div className="comments">
                            <div className="commentbg">
                                89
                                <div className="mark"></div>
                            </div>

                        </div>
                        <div className="views">
                            <i className="fa fa-eye"></i>
                            1,568</div>
                        <div className="time">
                            <i className="fa fa-clock-o"></i>
                            15 min</div>
                    </div>
                    <div className="clearfix"></div>
                </div>

                <div className="post">
                    <div className="wrap-ut pull-left">
                        <div className="userinfo pull-left">
                            <div className="avatar">
                                <img src="images/avatar3.jpg" alt="" />
                                <div className="status red">&nbsp;</div>
                            </div>

                            <div className="icons">
                                <img src={require('../../styles/images/icon2.jpg')} alt="" /><img src={require('../../styles/images/icon4.jpg')} alt="" />
                            </div>
                        </div>
                        <div className="posttext pull-left">
                            <h2>The Future of Magazines Is on Tablets</h2>
                            <p>Eric Schmidt has seen the future of magazines, and it's on the tablet. At a
                                Magazine Publishers Association.</p>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                    <div className="postinfo pull-left">
                        <div className="comments">
                            <div className="commentbg">
                                456
                                <div className="mark"></div>
                            </div>

                        </div>
                        <div className="views">
                            <i className="fa fa-eye"></i>
                            1,568</div>
                        <div className="time">
                            <i className="fa fa-clock-o"></i>
                            2 days</div>
                    </div>
                    <div className="clearfix"></div>
                </div>

            </div >
        )

    }
}
