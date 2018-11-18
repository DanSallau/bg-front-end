/**
 * Check if a string is empty
 * @param {string} value string variable to be checked
 * @returns {boolean} true if empty
*/
export function isEmpty(value: string): boolean {
    return (value && value.length > 0) ? false : true;
}

/**
 * Check if a number not negative
 * @param {number} value then number to be checked
 * @returns {boolean} true if negative
*/
export function isNegative(value: number): boolean {
    return (value && value >= 0) ? false : true;
}

/**
 * Check if a string matches a specific length
 * @param {string} value the string to be checked
 * @param {number} length the desired length
 * @returns {boolean} true if equal
*/
export function equalLength(value: string, length: number): boolean {
    return (value && value.length === length) ? true : false;
}

/**
 * Check two strings are equal in value and type
 * @param {any} value first string
 * @param {any} value2 second string
 * @returns {boolean} true if equal
*/
export function equal(value: any, value2: any): boolean {
    return (value && value2 && value === value2) ? true : false;
}

/**
 * Check if an email is valid
 * @param {string} value email
 * @returns {boolean} true if email is valid, false if email is not valid
*/
export function emailIsValid(value: string): boolean {
    return !/.+@.+\..+/.test(value);
}

/**
 * Check the validity of Danish CPR identification number
 * @param {string} value Danish CPR
 * @returns {boolean} true if valid
*/
export function cprIsValid(value: string): boolean {
    return !/[0-9]{2}[0,1][0-9][0-9]{2}(-?)[0-9]{4}?[^0-9]*/.test(value);
}

/**
 * Check if a variable is not a number
 * @param {any} value variable to be checked
 * @returns {boolean} true if not a number
*/
export function notANumber(value: any): boolean {
    return isNaN(value);
}

/**
 * Check if an object is empty, has no keys
 * @param {any} value should be an object, returns true if not
 * @returns {boolean} true if empty
*/
export function emptyObject(value: any): boolean {
    if(typeof(value) === 'object') {
        return (Object.keys(value)).length > 0 ? false : true;
    }
    return true;
}
