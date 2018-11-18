import { ReactHistory } from '../models/reduxModel';

/**
 * Type is in and out for within or new tab
 * @param {ReactHistory} history The redux history object
 * @param {string} url The URL to navigate to
 * @param {boolean} replace Whether to replace or not 
 * @param {boolean} newPage Whether to open in a new window or not
 */
export function navigate(history: ReactHistory, url: string, replace?: boolean, newPage?: boolean): void {
    if (newPage)
        window.open(url, "_blank");
    else {
        if (location.hash.substr(1) !== url) {
            if (replace)
                history.replace(url);
            else
                history.push(url)
        }
    }
}
