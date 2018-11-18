import { AppLanguageText } from './languageModel';

/**
 * @interface Dispatch Action
 * @param {string} type The type of the action
 * @param {any} [testResponse] The test response (Optional)
 */
export interface DispatchAction {
    type: string;
    testResponse?: any;
}

/**
 * Redux Response
 * @member {any} state
 * @member {string} [action] (Optional)
 */
export interface ReduxResponse {
    state: any;
    action?: string;
}

/**
 * App shared props through redux
 * @member {number} apiCalls
 * @member {function} changeLanguage
 * @member {ReactHistory} history
 * @member {AppLanguageText} language
 * @member {ReduxLocation} location
 * @member {ReduxMatch} match
 * @member {any} staticContext
 */
export interface AppSharedProps {
    apiCalls: number;
    changeLanguage: (code: string) => void;
    history: ReactHistory;
    language: AppLanguageText;
    location: ReduxLocation;
    match: ReduxMatch;
    staticContext: any;
}

/**
 * Redux History Object
 * @member {string} action
 * @member {function} block
 * @member {function} createHref
 * @member {function} go
 * @member {function} goBack
 * @member {function} goForward
 * @member {number} length
 * @member {function} listen
 * @member {ReduxLocation} location
 * @member {function} push
 * @member {function} replace
 */
export interface ReactHistory {
    action?: string;
    block?: () => any;
    createHref?: (location: string) => any;
    go?: (n?: any) => any;
    goBack?: () => void;
    goForward?: () => void;
    length?: number;
    listen?: (listener: any) => any;
    location?: ReduxLocation;
    push?: (path: string, state?: any) => any;
    replace?: (path: string, state?: any) => any;
}

/**
 * Redux Location Object
 * @member {string} pathname
 * @member {string} search
 * @member {string} hash
 * @member {any} state
 */
interface ReduxLocation {
    pathname?: string;
    search?: string;
    hash?: string;
    state?: any;
}

/**
 * Redux Match Object
 * @member {boolean} isExact
 * @member { {key => value} } params
 * @member {string} path
 * @member {string} url
 */
interface ReduxMatch {
    isExact?: boolean;
    params?: { [index: string]: any };
    path?: string;
    url?: string;
}