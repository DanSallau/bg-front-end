import * as React from 'react';
import { IPostModel } from '../../interfaces/posts';
import { FormattedRelative, FormattedNumber } from 'react-intl';
import HtmlParser from '../shared/htmlParser/HtmlParserComponent';
import { Link } from 'react-router-dom';


interface IPostState {
    items: Array<IPostModel>;
    isFetching: boolean,
    didInvalidate: boolean,
}

export interface IPostProps {
    posts: IPostState;
    getPosts: () => void;
}

export default class PostComponent extends React.PureComponent<IPostProps, {}> {
    componentDidMount() {
    }
    render() {
        const { posts } = this.props;
        return (
            <React.Fragment>
                {(!posts.isFetching && !posts.didInvalidate && posts.items.length === 0) &&
                    <div className="post">
                        <span className="empty-seacrh-message">Record notFound!</span>
                    </div>
                }
                {
                    posts.items.map((item: IPostModel, index: number) =>
                        <div className="post" key={index}>
                            <div className="wrap-ut pull-left">
                                <div className="userinfo pull-left">
                                    <div className="avatar">
                                        <img src={require('../../styles/images/avatar.jpg')} alt="" />
                                        <div className="status green">&nbsp;</div>
                                    </div>

                                    <div className="icons">
                                        <img src={require('../../styles/images/icon1.jpg')} alt="" /><img src={require('../../styles/images/icon4.jpg')} alt="" />
                                    </div>
                                </div>
                                <div className="posttext pull-left">
                                    <h2>
                                        <Link to={`/${item.id}/${item.title.replace(' ', '-')}`}>{item.title}</Link>
                                    </h2>
                                    <p> <HtmlParser htmlString={item.postSummary} /> </p>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="postinfo pull-left">
                                <div className="comments">
                                    <div className="commentbg">
                                        <FormattedNumber value={item.Comments.length} />
                                        <div className="mark"></div>
                                    </div>

                                </div>
                                <div className="views">
                                    <i className="fa fa-eye"></i>
                                    <FormattedNumber value={item.viewsCount} />
                                </div>
                                <div className="time">
                                    <i className="fa fa-clock-o"></i>
                                    <FormattedRelative value={item.createdOn} />
                                </div>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    )
                }
            </React.Fragment>
        )
    }
}
