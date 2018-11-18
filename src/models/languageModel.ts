/**
 * App Language Model interface (Top-level)
 * @member {string} langCode
 * @member {AppLanguageText} text
 */
export interface AppLanguage {
    langCode: string;
    text: AppLanguageText;
}

/**
 * App Language Text interface
 * @member {SharedLanguage} shared
 * @member {HomePageLanguage} homePage
 */
export interface AppLanguageText {
    shared: SharedLanguage;
    homePage: HomePageLanguage
}

/**
 * Shared Language interface
 * @member {string} title
 */
export interface SharedLanguage {
    title: string;
}

/**
 * Home page language interface
 * @member {CardContent} translations
 */
export interface HomePageLanguage {
    translations: CardContent;
}

/**
 * Card content interface
 * @member {string} title
 * @member {string} [desc] (Optional)
 * @member {string} [footer] (Optional)
 */
interface CardContent {
    title: string;
    desc?: string;
    footer?: string;
}