//Get, Set and Remove a global AccessToken
//At the moment token has been kept presistantly
let accessToken: string;

/**
 * Set the token and store it in localStorage
 * @param {string} value Token value
 */
export function setAccessToken(value: string): void {
    accessToken = 'bearer ' + value;
    localStorage.setItem('TOKEN', accessToken);
}

/**
 * Retrieves the token from localStorage
 * @returns {string} The token
 */
export function getAccessToken(): string {
    if (localStorage.getItem('TOKEN')) accessToken = localStorage.getItem('TOKEN');
    else return accessToken;
}

/**
 * Removes the access token from localStorage
 */
export function removeAccessToken(): void {
    accessToken = null;
    if (localStorage.getItem('TOKEN')) localStorage.removeItem('TOKEN')
}
