export function mergeProps(stateProps: Object, dispatchProps: Object, ownProps: Object) {
    return Object.assign({}, ownProps, stateProps, dispatchProps);
}

export function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}