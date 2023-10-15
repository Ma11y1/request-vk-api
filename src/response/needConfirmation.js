export class NeedConfirmation {

    constructor(session, group, method, queryParams, requestParams, response) {
        this.isNeedConfirmation = true;
        this.session = session;
        this.response = response;
        this.errorCode = response.error_code;
        this.errorMessage = response.error_msg;
        this.requestParams = response.request_params;
        this.confirmationText = response.confirmation_text;

        this.send = function (isConfirm) {
            queryParams.confirm = isConfirm ? 1 : 0;
            return session.callMethod(group, method, queryParams, requestParams);
        }
    }
}