import * as React from 'react';
import { Redirect } from 'react-router';
import { AccountApi } from '../../apis/account.api';
import TextInputComponent from "../shared/textInput/TextInputComponent";
import { ReactHistory } from '../../models/reduxModel';

interface IForgotPasswordState {
    email: string;
    emailError: string;
}
interface IForgotPasswordProps {
    account: any;
    history: ReactHistory;
}

export default class ForgotPasswordComponent extends React.PureComponent<IForgotPasswordProps, IForgotPasswordState> {
    private api: AccountApi;
    constructor(props: IForgotPasswordProps) {
        super(props);

        this.state = {
            email: '',
            emailError: ''
        };

        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);


        this.api = new AccountApi();
    }

    handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ email: e.target.value });
    }

    handleAuthentication(e: React.FormEvent<HTMLFormElement>) {
        let isValid = true;

        this.setState({
            emailError: ''
        });

        if (!this.state.email.trim()) {
            this.setState({ emailError: 'Field required' });
            isValid = false;
        }

        if (!isValid) {
            e.preventDefault();
            return;
        }
    
        this.api.resetPassword({ email: this.state.email }).then((response) => {
            if(response.status === 200) {
                this.props.history.push('/confirmation/reset-password');
            }
        });


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
                        <h2>Recover Password</h2>
                    </div>

                    <div className="posttext forgot-password-container">

                        <div className="row">
                            <div className="col-lg-10 col-md-10 col-sm-10 col-xs-8">
                                <TextInputComponent type="text" placeHolder="email" name="email" id="email" error={this.state.emailError} onTextChanged={this.handleUsernameChange} />
                            </div>
                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-4 btn-column">
                                <button
                                    type="submit"
                                    className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

}