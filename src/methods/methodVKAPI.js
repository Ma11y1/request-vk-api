import {API_URL_METHODS} from "../constants.js";
import {Request} from "../request.js";


export class MethodVKAPI {
    /**
     * @param {VKSession} session
     * @param {group: string, method: string, language: number | LANGUAGE_API, version: string, searchParams: Object, requestParams: Object }
     * @return {Promise<Object>}
     */
    static async call(session, {group, method, language, version, queryParams, requestParams}) {
        if(!requestParams) requestParams = {};

        requestParams.agent = session.agent;
        requestParams.timeout = session.timeout;

        queryParams = new URLSearchParams({
            v: version || session.version,
            lang: language || session.language,
            ...queryParams
        });

        if (session.isHeaderBearerToken) {
            requestParams.headers = {
                Authorization: `Bearer ${session.token}`
            };
        } else {
            queryParams.set("access_token", session.token);
        }
        const url = `${API_URL_METHODS}/${group}.${method}?${queryParams.toString()}`;

        return Request.getJSON(url, requestParams);
    }

    /**
     * @param {VKSession} session
     * @param {group: string, method: string, language: number | LANGUAGE_API, version: string, searchParams: Object, requestParams: Object }
     * @return {Promise<Object>}
     */
    static async callByFormData(session, {group, method, language, version, queryParams, requestParams}) {
        if(!requestParams) requestParams = {};

        requestParams.agent = session.agent;
        requestParams.timeout = session.timeout;

        queryParams = {
            lang: language || session.language,
            ...queryParams
        }

        let url = `${API_URL_METHODS}/${group}.${method}?v=${version || session.version}`;
        if (session.isHeaderBearerToken) {
            requestParams.headers = {
                Authorization: `Bearer ${session.token}`
            };
        } else {
            url += `&access_token=${session.token}`;
        }

        return Request.postFormData(url, requestParams, queryParams);
    }
}