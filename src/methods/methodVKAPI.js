import {METHOD_GROUP_TYPE} from "./methodGroupType.js";
import {API_URL_METHODS, VERSION_API} from "../constants.js";
import {Request} from "../request.js";


export class MethodVKAPI {
    static _groupType = METHOD_GROUP_TYPE.NONE;
    static types = null;

    constructor(version = VERSION_API) {
        this._version = version;
    }

    /**
     * @param {session: VKSession, group: string, method: string, language: number | LANGUAGE_API, params: Object }
     * @return {Promise<String>}
     */
    async call({session, group, method, language, params = {}}) {
        return MethodVKAPI.call({session, group, method, language, params});
    }

    /**
     * @param {session: VKSession, group: string, method: string, language: number | LANGUAGE_API, params: Object }
     * @return {Promise<Object>}
     */
    async callJSON({session, group, method, language, params = {}}) {
        return MethodVKAPI.callJSON({session, group, method, language, params});
    }

    /**
     * @param {session: VKSession, group: string, method: string, language: number | LANGUAGE_API, params: Object }
     * @return {Promise<String>}
     */
    static async call({session, group, method, language, params = {}}) {
        params.agent = session;
        params.timeout = session.timeout;

        return await Request.get(
            `${API_URL_METHODS}/${group || MethodVKAPI._groupType}.${method}?v=${session.version || VERSION_API}&access_token=${session.token}&lang=${language || session.language}`,
            params
        );
    }

    /**
     * @param {session: VKSession, group: string, method: string, language: number | LANGUAGE_API, params: Object }
     * @return {Promise<String>}
     */
    static async callJSON({session, group, method, language, params = {}}) {
        params.agent = session;
        params.timeout = session.timeout;

        return await Request.getJSON(
            `${API_URL_METHODS}/${group || MethodVKAPI._groupType}.${method}?v=${session.version || VERSION_API}&access_token=${session.token}&lang=${language || session.language}`,
            params
        );
    }

    /** @return { METHOD_GROUP_TYPE, string } */
    static get groupType() {
        return this._groupType;
    }

    /** @return { boolean } */
    get isMethodVKAPI() {
        return true;
    }

    /** @return { string } */
    get version() {
        return this._version;
    }
}