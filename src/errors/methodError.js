import {ErrorAPI} from "./errorAPI.js";

export class MethodError extends ErrorAPI {

    constructor({code, message, requestParams}) {
        super({code, message});

        this.requestParams = requestParams;

    }
}