import {ErrorAPI} from "./errorAPI.js";

export class ErrorConfirmationRequired extends ErrorAPI {

    constructor(code, message, requestParams, confirmationText) {
        super(code, message, requestParams);
        this.isErrorConfirmationRequired = true;
        this.confirmationText = confirmationText;
    }
}