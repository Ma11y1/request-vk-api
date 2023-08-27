import {LANGUAGE_API} from "./constants.js";

let id = 0;
export class VKSession {

    constructor() {
        this._id = id++;

        this._login = null;
        this._token = null;

        this._lang = LANGUAGE_API.RUSSIA;

        this._dateAuth = new Date();
        this._isAuth = false;
    }

    async auth() {

        this._dateAuth = new Date();
        this._isAuth = true;
    }

    async callMethod(method, params) {

    }
}