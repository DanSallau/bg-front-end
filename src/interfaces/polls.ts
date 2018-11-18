interface IPollChoice {
    id: number,
    choice: string,
    createdOn: string,
    Votes: Array<IVote>
}
export interface IVote {
    userId: number,
    pollChoiceId: number,
    createdOn?: string,
}
export interface IPollModel {
    question: string,
    isPollOfTheWeek: boolean,
    createdOn: string,
    expiresOn: string,
    likesCount: number,
    dislikesCount: number,
    createdAt: string,
    updatedAt: string,
    userId: number,
    PollChoices: Array<IPollChoice>,
    maxNumber?: number,
    votedChoice?: IVote
}