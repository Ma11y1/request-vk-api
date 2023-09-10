import {ErrorAPI} from "./errorAPI.js";


export class ErrorValidationRequired extends ErrorAPI {

    constructor(code, message, requestParams, redirectURI) {
        super(code, message, requestParams);
        this.isErrorValidationRequired = true;
        this.redirectURI = redirectURI;
    }
}