import * as React from 'react';

import { SliderComponent } from '../components/shared/slider/SliderComponent';
import HeaderComponent from '../components/shared/header/HeaderComponent';
import PaginationComponent from '../components/shared/pagination/PaginationComponent';
import FooterComponent from '../components/shared/footer/FooterComponent';

import CategorySideBarComponent from '../components/shared/categrories/CategoriesComponent';

import PollOftheWeekComponent from '../components/shared/poll/PollComponent';

import ThreadOfTheWeek from '../components/shared/threadsOfTheWeek/ThreadOfTheWeekComponent';
import { IPostModel } from '../interfaces/posts';
import { IPollModel } from '../interfaces/polls';
import { IError } from '../interfaces/common';

import { Redirect } from 'react-router-dom';

interface IPostLayout {
    account: any;
    posts: Array<IPostModel>,
    threadsOfTheWeek: any,
    signOut: () => void,
    pollOfTheWeek: IPollModel;
    receivePolls: (polls: Array<IPollModel>) => void,
    requestPolls: () => void,
    logPollsError: (error: IError) => void;
    logAccountError: (error: IError) => void;
    requestPosts: () => void;
    receivePosts: (json: Array<IPostModel>) => void;
    logPostError: (err: IError) => void
}

export default class PostLayout extends React.PureComponent<IPostLayout, {}> {

    render() {
        console.log('The threads of the weeks are ', this.props);

        const { account } = this.props;

        if (account.error && account.error.message && !account.isAuthenticated) {
            return <Redirect to={'signin'} />
        }
        return (
            <div className="container-fluid">

                <SliderComponent />

                {this.props.account && 
                    <HeaderComponent 
                        signOut={this.props.signOut} 
                        account={this.props.account} 
                        receivePosts={this.props.receivePosts} 
                        requestPosts={this.props.requestPosts} 
                        logPostError={this.props.logPostError}
                    />}

                <section className="content">

                    <PaginationComponent />
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-8">
                                {this.props.children}
                            </div>
                            <div className="col-lg-4 col-md-4">

                                <CategorySideBarComponent />

                                {this.props.pollOfTheWeek &&
                                    <PollOftheWeekComponent
                                        poll={this.props.pollOfTheWeek}
                                        account={this.props.account}
                                        requestPolls={this.props.requestPolls}
                                        receivePolls={this.props.receivePolls}
                                        logPollsError={this.props.logPollsError}
                                        logAccountError={this.props.logAccountError}
                                    />}

                                {this.props.threadsOfTheWeek && <ThreadOfTheWeek threads={this.props.threadsOfTheWeek} />}

                            </div>
                        </div>
                    </div>

                    <PaginationComponent />

                </section>

                <footer>
                    <FooterComponent />
                </footer>

            </div>
        )
    }

}