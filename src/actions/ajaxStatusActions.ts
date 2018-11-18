import * as types from '../models/constants/actionTypes';
import { DispatchAction } from '../models/reduxModel';

/**
 * Dispatches the <Begin Ajax Call> action
 * @returns {DispatchAction} The dispatch action of type DispatchAction
 * @see DispatchAction interface in reduxModel
 */
export function beginAjaxCall(): DispatchAction {
    return { type: types.BEGIN_AJAX_CALL };
}

/**
 * Dispatches the <End Ajax Call> action
 * @returns {DispatchAction} The dispatch action of type DispatchAction
 * @see DispatchAction interface in reduxModel
 */
export function ajaxCallEnded(): DispatchAction {
    return { type: types.END_AJAX_CALL };
}

/**
 * Dispatches the <Error Ajax Call> action
 * @returns {DispatchAction} The dispatch action of type DispatchAction
 * @see DispatchAction interface in reduxModel
 */
export function ajaxCallError(): DispatchAction {
    return { type: types.AJAX_CALL_ERROR };
}

