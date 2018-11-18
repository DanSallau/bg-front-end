import { IUserModel } from '../interfaces/Users';

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('user');
        if (serializedState === null) {
            return undefined;
        }

        return JSON.parse(serializedState);

    } catch (err) {
        return undefined;
    }
}

export const saveState = (state: IUserModel | undefined): Promise<any> => {
    return new Promise((resolve, reject) => {
        try {
            const serializedState = JSON.stringify(state);
            localStorage.setItem('user', serializedState);
            resolve({ success: true });
        } catch (err) {
            reject(err);
        }
    });

}