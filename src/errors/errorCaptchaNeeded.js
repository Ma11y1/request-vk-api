import {ErrorAPI} from "./errorAPI.js";


export class ErrorCaptchaNeeded extends ErrorAPI {

    constructor(code, message, requestParams, captchaSID, captchaImg) {
        super(code, message, requestParams);
        this.isErrorCaptchaNeeded = true;
        this.captchaSID = captchaSID;
        this.captchaImg = captchaImg;
    }
}