import {METHOD_GROUP_TYPE} from "./methodGroupType.js";
import {API_URL_METHODS} from "../constants.js";
import {Request} from "../request.js";
import {
    ErrorAPI,
    ErrorCaptchaNeeded,
    ErrorConfirmationRequired,
    ErrorValidationRequired,
    METHOD_API_ERROR_CODE
} from "../errors/index.js";


export class MethodVKAPI {
    /**
     * @param {VKSession} session
     * @param {group: string, method: string, language: number | LANGUAGE_API, version: string, searchParams: Object, requestParams: Object }
     * @return {Promise<Object>}
     */
    static async call(session, {group, method, language, version, searchParams, requestParams = {}}) {
        requestParams.agent = session;
        requestParams.timeout = session.timeout;

        const url = `${API_URL_METHODS}/${group}.${method}?`;
        searchParams = new URLSearchParams({
            v: version || session.version,
            lang: language || session.language,
            ...searchParams
        });

        if(session.isHeaderBearerToken) {
            requestParams.headers = {
                Authorization: `Bearer ${session.token}`
            };
        }else {
            searchParams.set("access_token", session.token);
        }

        return Request.getJSON(url, requestParams).then((result) => {
            if(result.error) {
                result = result.error;
                switch (result.error_code) {
                    case METHOD_API_ERROR_CODE.CAPTCHA_NEEDED: {
                        throw new ErrorCaptchaNeeded(result.error_code, result.error_msg, result.request_params, result.captcha_sid, result.captcha_img);
                    }
                    case METHOD_API_ERROR_CODE.VALIDATION_REQUIRED: {
                        throw new ErrorValidationRequired(result.error_code, result.error_msg, result.request_params, result.redirect_uri);
                    }
                    case METHOD_API_ERROR_CODE.CONFIRMATION_REQUIRED: {
                        throw new ErrorConfirmationRequired(result.error_code, result.error_msg, result.request_params, result.confirmation_text);
                    }
                    default: throw new ErrorAPI(result.error_code, result.error_msg, result.request_params);
                }
            }
            return result;
        });
    }

    /** @return { METHOD_GROUP_TYPE, string } */
    static get groupType() {
        return this._groupType;
    }
}