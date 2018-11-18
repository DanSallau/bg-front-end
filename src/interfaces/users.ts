

export interface IUserModel {
    id?: number,
    userName: string,
    password: string,
    firstName?: string,
    lastName?: string,
    email?: string
}

interface IUserObj {
    isFetching: false,
    didInvalidate: false,
    items: Array<IUserModel>
}

export interface IUsersComponentProps {
    dispatch: (action: any) => void;
    getUsers: () => void;
    translations: any,
    signInUser: (user: IUserModel) => void;
    users: IUserObj
}