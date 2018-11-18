import * as React from 'react';

import { IUserModel } from '../../interfaces/Users';

import './AccountLoginComponent.scss'
import { ReactHistory } from '../../models/reduxModel';
import { Redirect } from 'react-router';
import { Link } from "react-router-dom";
import TextInputComponent from "../shared/textInput/TextInputComponent";

interface IAccountLoginModel {
    user: IUserModel;
    isAuthenticated: boolean;
}

export interface IAccountLoginState {
    userName: string;
    userNameError?: string;
    password: string;
    passwordError?: string;
    remember: boolean;
}

export interface IAccountLoginProps {
    account: any;
    getPosts: () => void;
    history: ReactHistory;
    match: {};
    authenticateUser: (state: IAccountLoginState) => {}
}

export default class AccountLoginComponent extends React.PureComponent<IAccountLoginProps,
    IAccountLoginState> {

    constructor(props: IAccountLoginProps) {
        super(props);

        this.state = {
            userName: '',
            userNameError: '',
            passwordError: '',
            password: '',
            remember: false
        };

        this.handleUsernameChange = this
            .handleUsernameChange
            .bind(this);
        this.handlePasswordChange = this
            .handlePasswordChange
            .bind(this);

        this.handleRememberCheck = this
            .handleRememberCheck
            .bind(this);

        this.handleAuthentication = this
            .handleAuthentication
            .bind(this);
    }

    handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ userName: e.target.value });
    }

    handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ password: e.target.value });
    }

    handleRememberCheck(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            remember: !this.state.remember
        });
    }

    handleAuthentication(e: React.FormEvent<HTMLFormElement>) {
        const { authenticateUser } = this.props;

        let isValid = true;


        this.setState({
            userNameError: '',
            passwordError: '',
        });

        if (!this.state.userName.trim()) {
            this.setState({ userNameError: 'Field required' });
            isValid = false;
        }

        if (!this.state.password.trim()) {
            this.setState({ passwordError: 'Field required' });
            isValid = false;
        }

        if (!isValid) {
            e.preventDefault();
            return;
        }

        authenticateUser(this.state);

        e.preventDefault();
    }

    render() {
        const { account } = this.props;

        const { isAuthenticated } = this.props.account;

        if (isAuthenticated && account.user) {
            if (account.returnUrl) {
                return <Redirect to={account.returnUrl} />
            } else {
                return <Redirect to={'/'} />
            }
        }

        return (
            <div className="post">
                <form className="form newtopic" onSubmit={this.handleAuthentication}>
                    <div className="postinfotop">
                        <h2>Account login</h2>
                    </div>

                    <div className="posttext new-account-container">

                        <div className="row">
                            <div className="col-lg-12 col-md-12">
                                <TextInputComponent type="text" placeHolder="username" name="username" id="username" error={this.state.userNameError} onTextChanged={this.handleUsernameChange} />

                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-12 col-md-12">
                                <TextInputComponent type="password" placeHolder="password" name="password" id="password" error={this.state.passwordError} onTextChanged={this.handlePasswordChange} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-12 col-md-12">
                                <div className="checkbox">
                                    <label><input
                                        type="checkbox"
                                        name="remember"
                                        id="remember"
                                        onChange={this.handleRememberCheck}
                                        className="form-control" />Remember me ?</label>
                                </div>

                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-12 col-md-12">
                                {(account.err && account.error.message) ?
                                    <div className="alert alert-danger">
                                        <strong>Danger!</strong> {account.error.message}
                                    </div>
                                    :
                                    null
                                }

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-md-12">

                                <Link
                                    to="/forget-password"
                                    className="forgot-password">Forgot password ?</Link>


                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-md-12">
                                Dont have an account yet ?
                                            <Link
                                    to="/signup"
                                    className="form-c">Signup</Link>

                            </div>
                        </div>

                        <div className="clearfix"></div>

                    </div>

                    <div className="postinfobot">

                        <div className="pull-right postreply">
                            <div className="pull-left smile">
                                <a>
                                    <i className="fa fa-smile-o"></i>
                                </a>
                            </div>
                            <div className="pull-left">
                                <button
                                    type="submit"
                                    className="btn btn-primary">Sign In</button>
                            </div>
                            <div className="clearfix"></div>
                        </div>

                        <div className="clearfix"></div>
                    </div>
                </form>
            </div>

        )

    }
}
