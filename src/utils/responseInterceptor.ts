import { navigate } from './navigateUtil';
import { ReactHistory } from '../models/reduxModel';

/** This interceptor listens to status types and take actions based on them
 * @param {any} response Response data
 * @param {function} success Success handler method
 * @param {function} failed Fail handler method
 * @param {ReactHistory} history Redux History Object
*/
export function responseInterceptor(
    response: any,
    success: (data: any) => void,
    failed: (response: any) => void,
    history?: ReactHistory
): void {
    //We succeed
    if (response &&
        response.status && (
            response.status === 200 ||
            response.status === 201 ||
            response.status === 204)) {

        //We return success if we found data obj from axios response
        if (response.data)
            success(response.data);
        else
            failed(response);
    }
    //We failed with redirect to login if the response comes as Unauthorized or Forbidden
    else if (response &&
        response.status && (
            response.status === 401)) {

        if (history)
            navigate(history, '/login', true);
        else
            failed(response);
    }
    //We have generic fail with callback
    else
        failed(response);
}
