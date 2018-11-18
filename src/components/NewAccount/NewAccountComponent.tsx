import * as React from 'react';
import { IUserModel } from '../../interfaces/users';
import { Redirect } from 'react-router';
import TextInputComponent from "../shared/textInput/TextInputComponent";
import { UserApi } from '../../apis/user.api';
import { IError } from "../../interfaces/common";
import { validateEmail } from "../../utils/functions";
import { AxiosError } from 'axios';

interface INewAccountState {
    firstName?: string;
    lastName?: string;
    userName: string;
    password: string;
    email: string;
    confirmPassword: string;
    firstNameError?: string;
    lastNameError?: string;
    emailError?: string;
    passwordError?: string;
    confirmPasswordError?: string;
    userNameError?: string;
    tnc: boolean;
    errors: Array<IError>
}

export interface INewAccountProps {
    posts: INewAccountState;
    account: any;
    getPosts: () => void;
    history: any;
    match: {};
}

export default class NewAccountComponent extends React.PureComponent<INewAccountProps, INewAccountState> {
    private api: UserApi;

    constructor(props: INewAccountProps) {
        super(props);

        this.state = {
            userName: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            confirmPassword: '',
            firstNameError: '',
            lastNameError: '',
            emailError: '',
            passwordError: '',
            confirmPasswordError: '',
            userNameError: '',
            tnc: false,
            errors: []
        };

        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleConfirmChange = this.handleConfirmChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onTnCChange = this.onTnCChange.bind(this);

        this.api = new UserApi();
    }

    handleLastNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ lastName: e.target.value });
    }

    handleFirstNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ firstName: e.target.value });
    }

    handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ email: e.target.value });
    }


    handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ password: e.target.value });
    }


    handleConfirmChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ confirmPassword: e.target.value });
    }


    handleUserNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ userName: e.target.value });
    }

    onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        let isValid = true;

        this.setState({
            firstNameError: '',
            lastNameError: '',
            emailError: '',
            passwordError: '',
            confirmPasswordError: '',
            userNameError: ''
        });

        if (!this.state.userName.trim()) {
            this.setState({ userNameError: 'Field required' });
            isValid = false;
        }

        if (!this.state.firstName.trim()) {
            this.setState({ firstNameError: 'Field required' });
            isValid = false;
        }

        if (!this.state.lastName.trim()) {
            this.setState({ lastNameError: 'Field required' });
            isValid = false;
        }

        if (!this.state.password.trim()) {
            this.setState({ passwordError: 'Field required' });
            isValid = false;
        }

        if (this.state.password.trim().length < 6) {
            this.setState({ passwordError: 'Password length should be 6 or greater ' });
            isValid = false;
        }

        if (!this.state.email.trim()) {
            this.setState({ emailError: 'Field required' });
            isValid = false;
        }
 
        if (!validateEmail(this.state.email)) {
            this.setState({ emailError: 'email format is wrong' });
            isValid = false;
        }

        if (!this.state.confirmPassword.trim()) {
            this.setState({ confirmPasswordError: 'Field required' });
            isValid = false;
        }

        if (this.state.confirmPassword !== this.state.password) {
            this.setState({ confirmPasswordError: 'password does not match' });
            isValid = false;
        }

        if (!isValid) {
            e.preventDefault();
            return;
        }

        const user: IUserModel = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            userName: this.state.userName
        };

        this.api.createUser(user)
            .then((response) => {
                if (response.status === 200) {
                    this.props.history.push('/messages/new-user')
                }
            })
            .catch((errorRes: AxiosError) => {
                if (errorRes.response && errorRes.response.data) {
                    this.setState({ errors: errorRes.response.data });
                }
            })

        e.preventDefault();
    }

    onTnCChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ tnc: e.target.checked });
    }

    componentWillMount() {
        const { isAuthenticated } = this.props.account;

        if (isAuthenticated) {
            this.props.history.push('/');
        }
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
                <form className="form newtopic" onSubmit={this.onFormSubmit}>
                    <div className="postinfotop">
                        <h2>Create New Account</h2>
                    </div>


                    <div className="posttext new-account-container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12">
                                <div className="acccap">
                                    <h3>Required Fields</h3>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <TextInputComponent type="text" placeHolder="First Name" name="fname" id="fname" error={this.state.firstNameError} onTextChanged={this.handleFirstNameChange} />

                            </div>
                            <div className="col-lg-6 col-md-6">
                                <TextInputComponent type="text" placeHolder="Last Name" name="lname" id="lname" error={this.state.lastNameError} onTextChanged={this.handleLastNameChange} />
                            </div>
                        </div>
                        <div>
                            <TextInputComponent type="text" placeHolder="Username" name="username" id="username" error={this.state.userNameError} onTextChanged={this.handleUserNameChange} />
                        </div>
                        <div>
                            <TextInputComponent type="text" placeHolder="email" name="email" id="email" error={this.state.emailError} onTextChanged={this.handleEmailChange} />
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <TextInputComponent type="password" placeHolder="Password" name="pass" id="pass" error={this.state.passwordError} onTextChanged={this.handlePasswordChange} />
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <TextInputComponent type="password" placeHolder="Confirm Password" name="pass2" id="pass2" error={this.state.confirmPasswordError} onTextChanged={this.handleConfirmChange} />
                            </div>
                        </div>
                        {this.state.errors &&
                            <div className="row">
                                <ul className="text-danger">
                                    {this.state.errors.map(err =>
                                        <li>{err.message}</li>)
                                    }
                                </ul>

                            </div>
                        }
                    </div>

                    <div className="postinfobot sign-up-footer">

                        <div className="notechbox pull-left">
                            <input type="checkbox" name="note" id="note" onChange={this.onTnCChange} className="form-control" />
                        </div>

                        <div className="pull-left lblfch">
                            <label htmlFor="note"> I agree with the Terms and Conditions of this site</label>
                        </div>

                        <div className="pull-right postreply">
                            <div className="pull-left smile"><a href="#"><i className="fa fa-smile-o"></i></a></div>
                            <div className="pull-left"><button type="submit" className="btn btn-primary" disabled={!this.state.tnc}>Sign Up</button></div>
                            <div className="clearfix"></div>
                        </div>


                        <div className="clearfix"></div>
                    </div>


                </form>
            </div>


        )

    }
}
