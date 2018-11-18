import * as React from 'react';
import { IPollModel, IVote } from '../../../interfaces/polls';
import { FormattedDate } from 'react-intl';
import { PollApi } from '../../../apis/poll.api';

interface IPollProps {
    poll: IPollModel,
    account: any,
    receivePolls: (polls: Array<IPollModel>) => void,
    requestPolls: () => void;
    logPollsError: (error: any) => void;
    logAccountError: (error: any) => void;
}

export default class PollOfTheWeek extends React.PureComponent<IPollProps, {}> {
    private api: PollApi;

    constructor(props: IPollProps) {
        super(props);

        this.handlePollSelection = this.handlePollSelection.bind(this);

        this.api = new PollApi();
    }

    handlePollSelection(e: React.ChangeEvent<HTMLInputElement>) {
        const { account, receivePolls, requestPolls, logPollsError, logAccountError } = this.props;

        const value = e.target.value;

        const payLoad: IVote = {
            userId: account.user.id,
            pollChoiceId: Number(e.target.value),
        };

        requestPolls();

        this.api.castVote(payLoad, account.token).then((response) => {
            if (response.status === 200) {
                //redirect to page or list 
                receivePolls(response.data);

            }
        }).catch((err) => {
            // logPost Error here
            console.log("Its now error buddy ", err)
            if (err.type === 'account' || err.response.data.type === 'account') {
                logAccountError(err.response.data);
            }
            logPollsError(err.response.data);

        })

        e.preventDefault();
    }

    render() {
        const { poll } = this.props;
        return (

            <div className="sidebarblock">
                <h3>Zaben Mako</h3>
                <div className="divline"></div>
                <div className="blocktxt">
                    <p>{this.props.poll.question} ?</p>
                    <form action="#" method="post" className="form">
                        <table className="poll">
                            <tbody>
                                {poll.PollChoices.map((choice, index) =>
                                    <tr key={index}>
                                        <td>
                                            <div className="progress">
                                                <div
                                                    className={'progress-bar color' + (index + 1)}
                                                    role="progressbar"
                                                    aria-valuenow={choice.Votes.length}
                                                    aria-valuemin={0}
                                                    aria-valuemax={poll.maxNumber}
                                                    style={{
                                                        width: `${choice.Votes.length}%`
                                                    }}>
                                                    {choice.choice}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="chbox">
                                            <input
                                                id={'opt' + (choice.id)}
                                                type="radio"
                                                name="opt"
                                                value={choice.id}
                                                onChange={this.handlePollSelection}
                                                checked={poll.votedChoice ? poll.votedChoice.pollChoiceId === choice.id : false}
                                                disabled={poll.votedChoice ? poll.votedChoice.pollChoiceId !== undefined : false} />
                                            <label htmlFor={'opt' + (choice.id)}></label>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </form>
                    <p className="smal">Zabi zai kare ranar <FormattedDate value={poll.createdOn} day="2-digit" month="long" year="2-digit" />;</p>
                </div>
            </div>
        )
    }
}
