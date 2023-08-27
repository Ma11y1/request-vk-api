import {methodGroupType} from "./methodGroupType.js";
import {API_VERSION} from "../constants.js";


export class MethodVKAPI {
    static _groupType = methodGroupType.NONE;

    static types = null;

    /** @return { methodGroupType, string } */
    static get groupType() {
        return this._groupType;
    }

    constructor(version = API_VERSION) {
        this._groupType = methodGroupType.NONE;
        this._version = version;
    }

    /**
     * @param {session: VKSession, method: string, lang: number, LANGUAGE_API }
     * @return {Promise<String>}
     */
    async call({session, method, language}) {}

    /**
     * @param {session: VKSession, method: string, lang: number, LANGUAGE_API }
     * @return {Promise<Object>}
     */
    async callJSON({session, method, language}) {}


    /** @return { boolean } */
    get isMethodVKAPI() {
        return true;
    }

    /** @return { methodGroupType, string } */
    get groupType() {
        return this._groupType;
    }

    /** @return { string } */
    get version() {
        return this._version;
    }
}