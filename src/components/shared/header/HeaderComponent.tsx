import * as React from 'react';
import { Link } from 'react-router-dom';
import { PostApi } from '../../../apis/post.api';
import { IPostModel } from '../../../interfaces/posts';
import { IError } from '../../../interfaces/common';

interface IHeaderProps {
    account: any;
    signOut: () => void;
    requestPosts: () => void;
    receivePosts: (json: Array<IPostModel>) => void;
    logPostError: (err: IError) => void
}

interface IStateProps {
    searchText: string;
}
export default class HeadComponent extends React.PureComponent<IHeaderProps, IStateProps> {
    private api: PostApi
    constructor(props: IHeaderProps) {
        super(props);

        this.api = new PostApi();
        this.state = { searchText: "" };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSearchTextChanged = this.handleSearchTextChanged.bind(this);
    }

    handleSearch(e: React.FormEvent<HTMLElement>) {
        const { requestPosts, receivePosts, logPostError } = this.props;

        requestPosts();
        this.api.searchPostByText(this.state.searchText || 'all').then((response) => {
            if (response.status === 200) {
                receivePosts(response.data);
            }
        }).catch((err) => {
            //logError Message
            logPostError(err);
        })
        e.preventDefault();
    }

    handleSearchTextChanged(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ searchText: e.target.value })
    }

    render() {
        return (
            <div className="headernav">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-1 col-xs-3 col-sm-2 col-md-2 logo ">
                            <a href="index.html"><img src={require('../../../styles/images/logo.jpg')} alt="" /></a>
                        </div>
                        <div className="col-lg-3 col-xs-9 col-sm-5 col-md-3 selecttopic">
                            <div className="dropdown">
                                <a data-toggle="dropdown" href="#">{this.props.account.user.firstName + ' ' + this.props.account.user.userName}</a>
                                <b className="caret"></b>
                                <ul className="dropdown-menu" role="menu">
                                    <li role="presentation">
                                        <a role="menuitem" tab-index="-1" href="#">Borderlands 1</a>
                                    </li>
                                    <li role="presentation">
                                        <a role="menuitem" tab-index="-2" href="#">Borderlands 2</a>
                                    </li>
                                    <li role="presentation">
                                        <a role="menuitem" tab-index="-3" href="#">Borderlands 3</a>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4 search hidden-xs hidden-sm col-md-3">
                            <div className="wrap">
                                <form className="form" onSubmit={this.handleSearch}>
                                    <div className="pull-left txt">
                                        <input type="text" className="form-control" placeholder="Search Topics" onChange={this.handleSearchTextChanged} />
                                    </div>
                                    <div className="pull-right">
                                        <button className="btn btn-default" type="submit">
                                            <i className="fa fa-search"></i>
                                        </button>
                                    </div>
                                    <div className="clearfix"></div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-4 col-xs-12 col-sm-5 col-md-4 avt">
                            <div className="stnt pull-left">
                                <Link to={'/new-post'}>
                                    <button className="btn btn-primary">Start New Topic</button>
                                </Link>
                            </div>
                            <div className="env pull-left">
                                <i className="fa fa-envelope"></i>
                            </div>

                            <div className="avatar pull-left dropdown">
                                <a data-toggle="dropdown" href="#"><img src={require('../../../styles/images/avatar.jpg')} alt="" /></a>
                                <b className="caret"></b>
                                <div className="status green">&nbsp;</div>
                                <ul className="dropdown-menu" role="menu">
                                    <li role="presentation">
                                        <a role="menuitem" tab-index="-1" href="#">My Profile</a>
                                    </li>
                                    <li role="presentation">
                                        <a role="menuitem" tab-index="-1" href="#/topic">Topic</a>
                                    </li>
                                    <li role="presentation">
                                        <a role="menuitem" tab-index="-2" href="#">Inbox</a>
                                    </li>
                                    <li role="presentation">
                                        <a role="menuitem" tab-index="-3" href="#" onClick={this.props.signOut}>Log Out</a>
                                    </li>
                                    <li role="presentation">
                                        <a role="menuitem" tab-index="-4" href="04_new_account.html">Create account</a>
                                    </li>
                                </ul>
                            </div>

                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
