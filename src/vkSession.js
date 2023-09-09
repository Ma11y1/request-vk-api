import {VERSION_API, LANGUAGE_API, REQUEST_TIMEOUT} from "./constants.js";
import {MethodAccount} from "./methods/index.js";
import {Agent} from "https";


let id = 1;
export class VKSession extends Agent {

    constructor(token, language, version, ...agentParams) {
        super({
            keepAlive: true,
            keepAliveMsecs: 0,
            ...agentParams
        });

        this._id = id++;
        this.version = version || VERSION_API;
        this.token = token;
        this._language = language || LANGUAGE_API.RUSSIA;

        this.timeout = REQUEST_TIMEOUT;
    }

    async init() {
        MethodAccount.getInfo(this)
            .then(res => console.log(res))
            .catch((err) => console.log(11, err));
    }

    async isValid() {

    }

    async callMethod(method, params) {

    }

    /** @return {number} */
    get id() {
        return this._id;
    }

    /** @return {number} */
    get language() {
        return this._language;
    }

    /** @param {string | number} value */
    set language(value) {
        if(typeof value === "string") value = LANGUAGE_API.getByName(value);
        if(!LANGUAGE_API.isValid(value)) return;
        this._language = value;
    }
}