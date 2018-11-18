export const requiredField = function (field: string) {
    return !field || field.length === 0;
}

export const fieldLength = function (field: string) {
    return field ? field.length : 0;
}

export const alphanumericField = function (field: string) {
    return /^[a-z0-9]+$/i.test(field)
}