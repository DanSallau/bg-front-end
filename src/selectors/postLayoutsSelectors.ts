import { createSelector, createStructuredSelector } from 'reselect';
import { IPostModel } from '../interfaces/posts';
import { IPollModel } from '../interfaces/polls';

import array from 'lodash/collection';
import * as _ from 'lodash';

const posts = (state, ownProps) => state.posts;

const routeProps = (state, ownProps) => ownProps;

const account = (state, ownProps) => state.account;

const polls = (state, ownProps) => state.polls;


const threadsOfTheWeek = createSelector(
    [posts],
    (postList) => {
        return postList.items.sort((postA: IPostModel, postB: IPostModel) =>
            postB.likesCount - postA.likesCount
        ).slice(0, 7)
            .map((post: IPostModel) => {
                return (
                    Object.assign({}, {
                        postTitle: post.title,
                        postId: post.id
                    })
                )

            });
    }
);

const pollOfTheWeek = createSelector(
    [polls, account],
    (pollList, accountDetail) => {
        const poll: IPollModel = pollList.items.find(poll => poll.isPollOfTheWeek === true);

        if (!poll) return null;


        const totalNumber = poll.PollChoices.reduce((p, c) => {
            return { ...c, Votes: new Array(p.Votes.length + c.Votes.length) };
        });

        const vote: any = poll.PollChoices
            .map((c, k) => ({ choice: c.Votes.find(v => v.userId === accountDetail.user.id) }))
            .find(v => v.choice !== undefined )

        return {
            ...poll,
            maxNumber: totalNumber.Votes.length,
            votedChoice: vote ? vote.choice : undefined
        }
    }
)

const categoryStatistics = createSelector(
    [posts],
    (postList) => {

        return _(postList.items)
            .groupBy(x => {
                return x.categoryItemId
            })
            .map((values, key) => ({
                categoryItemId: key,
                categoryItem: values[0].CategoryItem.item,
                categoryName: values[0].CategoryItem.Category.name,
                totalNumber: values.length
            }))
            .value();
    }
);

export default createStructuredSelector({
    posts,
    account,
    categoryStatistics,
    threadsOfTheWeek,
    pollOfTheWeek,
    ...routeProps
})