import { loadState } from '../store';

export class Permissions {
    canActivate(id: string): boolean {
        const state = loadState();
        if (state) {
            return true;
        } else {
            return false;
        }
    }
}
