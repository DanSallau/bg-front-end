import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import PostContainer from '../../containers/Post';
import TopicContainer from '../../containers/Topic';
import NotFoundContainer from '../../containers/NotFound';
import PostLayout from '../../containers/Layouts/PostLayoutContainer';
import NewPostContainer from '../../containers/NewPost';
import NewAccountContainer from '../../containers/NewAccount';
import ForgotPasswordContainer from '../../containers/ForgotPassword';

import MessageContainer from '../../containers/Message';
import AccountLogin from '../../containers/AccountLogin';
import AccountLayout from '../../containers/Layouts/AccountLayoutContainer';
import { LoaderComponent } from '../shared/loader/LoaderComponent';
import { ReactHistory } from '../../models/reduxModel';
import { IError } from '../../interfaces/common';

const AppRoute = ({
    component: Component,
    layout: Layout,
    ...rest
}) => (
        <Route
            {...rest}
            render={props => (
                <Layout>
                    <Component {...props} />
                </Layout>
            )} />
    );

interface IAppComponent {
    account: any;
    signOut: () => void;
    tryAuth: (token: string) => void;
    logAccountError: (error: IError) => void;
    getPolls: () => void;
    getCategories: () => void;
    getPosts: () => void;
    isLoading: boolean;
    history: ReactHistory;
    location: Location;
}

export default class AppComponent extends React.PureComponent<IAppComponent, {}> {

    async componentWillMount() {
        const { account } = this.props;
        if (account.user && account.token) {
            try {
                const token = account.token;
                this.props.tryAuth(token)
            } catch (err) {
                if (err.type === 'account') {
                    this.props.logAccountError(err)
                    this.props.signOut();
                }
            }
        }
    }

    componentDidMount() {
        const { getPolls, getCategories, getPosts } = this.props;

        getPosts();
        getPolls();
        getCategories();
    }

    componentDidCatch(error, info) {
        console.log("There is an error ", error);
        this.setState({ hasError: true });
    }

    render() {

        const { account } = this.props;
        console.log("There is account here ", account)
        if (account.error && account.error.message && !account.isAuthenticated) {
            // console.log("It his loading here ")
            // return <Redirect exact to={'signin'} />

            // return <Redirect to={'signin'} />
            // this.props.history.push('signin')
        }

        return (
            <div className="main-app">
                <LoaderComponent isLoading={this.props.isLoading}></LoaderComponent>

                <Switch>
                    <AppRoute exact path="/" component={PostContainer} layout={PostLayout} />
                    <AppRoute
                        exact
                        path="/new-post"
                        component={NewPostContainer}
                        layout={PostLayout} />
                    <AppRoute
                        exact
                        path="/signup"
                        component={NewAccountContainer}
                        layout={AccountLayout} />
                    <AppRoute exact path="/signin" component={AccountLogin} layout={AccountLayout} />

                    <AppRoute
                        exact
                        path="/forgot-password"
                        component={ForgotPasswordContainer}
                        layout={AccountLayout} />

                    <AppRoute
                        exact
                        path="/messages/:type"
                        component={MessageContainer}
                        layout={AccountLayout} />

                    <AppRoute
                        exact
                        path="/confirmation/:type"
                        component={MessageContainer}
                        layout={AccountLayout} />
                    <AppRoute
                        exact
                        path="/:postId/:title"
                        component={TopicContainer}
                        layout={PostLayout} />

                    <Redirect exact to="/" from="/home" />

                    <AppRoute path="*" component={NotFoundContainer} layout={PostLayout} />
                </Switch>
            </div>
        )
    }

}