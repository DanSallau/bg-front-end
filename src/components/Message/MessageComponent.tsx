import * as React from 'react';
import { match } from "react-router";
import { IError } from '../../interfaces/common';
import { NavLink } from 'react-router-dom';

const queryString = require('query-string');

interface IMessageState {
    userConfirmed: boolean;
}

interface IMessageProps {
    match: match<{ type: string }>;
    account: any;
    history: History;
    location: Location;
    tryAuth: (token: string) => void;
    logAccountError: (error: IError) => void;
}

export default class MessageComponent extends React.PureComponent<IMessageProps, IMessageState> {

    constructor(props: IMessageProps) {
        super(props);

        this.state = {
            userConfirmed: false
        };
    }

    componentDidMount() {
        if (this.props.match.params.type === 'confirm') {
            const parsed = queryString.parse(this.props.location.search);

            if (parsed.token) {
                try {
                    this.props.tryAuth(parsed.token)
                } catch (err) {
                    if (err.type === 'account') {
                        this.props.logAccountError(err)
                    }
                }
            }
        }
    }

    render() {

        return (
            <div className="post">

                {this.props.match.params.type === "new-user" && <div className="row">
                    <div className="new-user">
                        Account created successfully, A confirmation email was sent to  your email address. Please go to your email and confirm
                    </div>
                </div>
                }
                {(this.props.match.params.type === "confirm" && this.props.account.isAuthenticated) &&
                    <div className="row">
                        <div className="account-confirm">
                            Account confirmed successfully,
                            <NavLink to="/">Return Home</NavLink>
                        </div>
                    </div>
                }

                {this.props.match.params.type === "reset-password" && <div className="row">
                    <div className="password-reset">
                        Password reset link has been email to you, please check your email Address.
                    </div>
                </div>
                }

            </div>
        )

    }
}