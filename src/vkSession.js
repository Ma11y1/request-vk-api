import {Agent} from "https";
import {
    VERSION_API,
    LANGUAGE_API,
    REQUEST_TIMEOUT,
    PROFILE_INFO_SEX,
    PROFILE_INFO_RELATION,
    PROFILE_INFO_BDATE_VISIBLE
} from "./constants.js";
import {MethodVKAPI, METHOD_GROUP_TYPE} from "./methods/index.js";
import EventEmitter from "events";
import {ErrorAPI, METHOD_API_ERROR_CODE} from "./errors/index.js";
import {NeedCaptcha, NeedConfirmation, NeedValidation} from "./response/index.js";


const E_NEED_CAPTCHA = "needCaptcha";
const E_NEED_VALIDATION = "needValidation";
const E_NEED_CONFIRMATION = "needConfirmation";
const E_CHANGE_LONG_POOL = "changeLongPool";

export class VKSession extends EventEmitter {

    constructor({token, language, version, agentParams}) {
        super();

        this._token = token;
        this.version = version || VERSION_API;
        this.timeout = REQUEST_TIMEOUT;
        this._agent = new Agent({
            keepAlive: true,
            keepAliveMsecs: 0,
            ...agentParams
        });
        this.isHeaderBearerToken = false;
        this.isRequestFormData = false;
        this._isInit = false;

        this._id = -1;
        this.screenName = "";
        this.status = "";
        this.firstName = "";
        this.verifFirstName = "";
        this.lastName = "";
        this.verifLastName = "";
        this.sex = PROFILE_INFO_SEX.NONE; // 0 - undefined, 1 - women, 2 - men
        this.verifSex = PROFILE_INFO_SEX.NONE;
        this.birthDate = "";
        this.birthDateTS = new Date();
        this.verifBirthDate = "";
        this.verifBirthDateTS = new Date();
        this.birthDateVisibility = PROFILE_INFO_BDATE_VISIBLE.NONE; // 0 - don't show, 1 - show, 2 - show only day and month
        this.cityID = -1;
        this.cityTitle = "";
        this.countryID = -1;
        this.countryTitle = "";
        this.phone = "";
        this.relation = PROFILE_INFO_RELATION.NONE; // family status
        this.homeTown = null;
        this.photo = null;
        this._language = language || LANGUAGE_API.RUSSIA;
        this.isServiceAccount = false;
        this.isESIAVerified = false;
        this.isESIALinked = false;
        this.isTinkoffLinked = false;
        this.isTinkoffVerified = false;
        this.isSberVerified = false;
        this.oauthLinked = [];
        this.oauthVerification = [];
        this.verificationStatus = "";
        this.promoVerifications = [];

        this._longPoolServer = null;
    }

    init() {
        return this.callMethod(METHOD_GROUP_TYPE.ACCOUNT, "getProfileInfo")
            .then((info) => {
                if (!info.response) return info;

                info = info.response;
                this._id = +info.id;
                this.screenName = info.screen_name;
                this.firstName = info.first_name;
                this.lastName = info.last_name;
                this.birthDate = info.bdate;
                const [day, month, year] = info.bdate.split(".");
                this.birthDateTS.setFullYear(year, month, day);
                this.birthDateVisibility = info.bdate_visibility;
                this.sex = info.sex;
                if (info.account_verification_profile) {
                    const verifInfo = info.account_verification_profile;
                    this.verifFirstName = verifInfo.first_name;
                    this.verifLastName = verifInfo.last_name;
                    this.verifBirthDate = verifInfo.birthdate;
                    const [day, month, year] = verifInfo.birthdate.split(".");
                    this.verifBirthDateTS.setFullYear(year, month, day);
                    this.verifSex = verifInfo.sex;
                }
                this.cityID = info.city.id;
                this.cityTitle = info.city.title;
                this.countryID = info.country.id;
                this.countryTitle = info.country.title;
                this.phone = info.phone;
                this.relation = info.relation;
                this.status = info.status;
                this.photo = info.photo_200;
                this.homeTown = info.home_town;
                this.isServiceAccount = info.is_service_account;
                this.isESIAVerified = info.is_esia_verified;
                this.isESIALinked = info.is_esia_linked;
                this.isTinkoffLinked = info.is_tinkoff_linked;
                this.isTinkoffVerified = info.is_tinkoff_verified;
                this.isSberVerified = info.is_sber_verified;
                this.oauthLinked.length = 0;
                this.oauthLinked.push(...info.oauth_linked);
                this.oauthVerification.length = 0;
                this.oauthVerification.push(...info.oauth_verification);
                this.verificationStatus = info.verification_status;
                this.promoVerifications.length = 0;
                this.promoVerifications.push(...info.promo_verifications);

                this._isInit = true;
            });
    }

    async callMethod(group, method, queryParams, requestParams = {}) {
        const requestFunction = this.isRequestFormData ? MethodVKAPI.callByFormData : MethodVKAPI.call;

        return requestFunction(this, {group, method, queryParams, requestParams})
            .then((response) => {
                if (response.error) {
                    response = response.error;
                    switch (response.error_code) {
                        case METHOD_API_ERROR_CODE.CAPTCHA_NEEDED: {
                            const needCaptcha = new NeedCaptcha(this, group, method, queryParams, requestParams, response);
                            this.emit(E_NEED_CAPTCHA, needCaptcha);
                            return needCaptcha;
                        }
                        case METHOD_API_ERROR_CODE.VALIDATION_REQUIRED: {
                            const needValidation = new NeedValidation(this, group, method, queryParams, requestParams, response);
                            this.emit(E_NEED_VALIDATION, needValidation);
                            return needValidation;
                        }
                        case METHOD_API_ERROR_CODE.CONFIRMATION_REQUIRED: {
                            const needConfirmation = new NeedConfirmation(this, group, method, queryParams, requestParams, response);
                            this.emit(E_NEED_CONFIRMATION, needConfirmation);
                            return needConfirmation;
                        }
                        default:
                            throw new ErrorAPI(response.error_code, response.error_msg, response.request_params);
                    }
                }

                return response;
            });
    }

    get isInit() {
        return this._isInit;
    }

    get id() {
        return this._id;
    }

    get token() {
        return this._token;
    }

    get agent() {
        return this._agent;
    }

    get language() {
        return this._language;
    }

    get longPoolServer() {
        return this._longPoolServer;
    }

    get isInitLongPoolSever() {
        return !!this._longPoolServer;
    }

    set agent(value) {
        if (!(value instanceof Agent)) return;
        this._agent = value;
    }

    set language(value) {
        if (typeof value === "string") value = LANGUAGE_API.getByName(value);
        if (!LANGUAGE_API.isValid(value)) return;
        this._language = value;
    }

    set longPoolServer(value) {
        if(!value.isLongPoolServer) return;
        this._longPoolServer = value;
        this.emit(E_CHANGE_LONG_POOL, value);
    }
}