/**
 * Date format types
 * @member {string} BritishDate
 * @member {string} AmericanDate
 * @member {string} DanishDate
 * @member {string} DanishFullDate
 * @member {string} ShortDate
 * @member {string} ShortTime
 */
export const enum DateFormatTypes {
    BritishDate = "DD/MM/YYYY",
    AmericanDate = "MM/DD/YYYY",
    DanishDate = "DD-MM-YYYY",
    DanishFullDate = "DD-MM-YYYY, h:mm:ss a",
    ShortDate = "DD-MM",
    ShortTime = "hh:mm"
}

/**
 * Staff member types
 * @member {string} Staff
 * @member {string} Admin
 */
export const enum staffTypes {
    Staff = "Staff",
    Admin = "Admin"
}

/**
 * Preferred contact methods
 * @member {string} Email
 * @member {string} Phone
 */
export const enum preferredContactMethod {
    Email = "Email",
    Phone = "SMS"
}

/**
 * Account status types
 * @member {string} Locked
 * @member {string} Unlocked
 */
export const enum accountTypes {
    Locked = "Locked",
    Unlocked = "Unlocked"
}

/**
 * Gender types
 * @member {string} Male
 * @member {string} Female
 */
export const enum genderTypes {
    Male = "MALE",
    Female = "FEMALE"
}

/**
 * Relationship types
 * @member {string} Single
 * @member {string} Couple
 * @member {string} Married
 */
export const enum relationType {
    Single = "SINGLE",
    Couple = "COUPLE",
    Married = "MARRIED"
}

/** @constant Color Types */
export const colorAssociate = {
    "0": "#E65A6D",
    "1": "#406980",
    "2": "#6DBACE",
    "3": "#e4fe60",
    "4": "#FF6384",
    "5": "#36A2EB",
    "6": "#FFCE56",
    "7": "#800000"
}

