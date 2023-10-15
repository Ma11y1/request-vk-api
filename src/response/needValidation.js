export class NeedValidation {

    constructor(session, group, method, queryParams, requestParams, response) {
        this.isNeedValidation = true;
        this.session = session;
        this.errorCode = response.error_code;
        this.errorMessage = response.error_msg;
        this.redirectURI = response.redirect_uri;

        this.callMethodAgain = function () {
            return session.callMethod(group, method, queryParams, requestParams);
        }
    }
}