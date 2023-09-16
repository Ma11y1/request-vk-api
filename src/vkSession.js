import {Agent} from "https";
import {VERSION_API, LANGUAGE_API, REQUEST_TIMEOUT} from "./constants.js";
import {MethodVKAPI, METHOD_GROUP_TYPE, METHOD_ACCOUNT_TYPES} from "./methods/index.js";


export class VKSession extends Agent {

    constructor({token, language, version, agentParams}) {
        super({
            keepAlive: true,
            keepAliveMsecs: 0,
            ...agentParams
        });

        this._token = token;
        this.version = version || VERSION_API;
        this.timeout = REQUEST_TIMEOUT;
        this.isHeaderBearerToken = true;
        this._isInit = false;

        this._id = -1;
        this._screenName = "";
        this._status = "";
        this._firstName = "";
        this._verifFirstName = "";
        this._lastName = "";
        this._verifLastName = "";
        this._sex = -1; // 0 - undefined, 1 - women, 2 - men
        this._verifSex = -1;
        this._birthDate = "";
        this._birthDateTS = new Date();
        this._verifBirthDate = "";
        this._verifBirthDateTS = new Date();
        this._birthDateVisibility = -1; // 0 - dont show, 1 - show, 2 - show only day and month
        this._cityID = -1;
        this._cityTitle = "";
        this._countryID = -1;
        this._countryTitle = "";
        this._phone = "";
        this._relation = -1; // family status
        this._homeTown = null;
        this._photo = null;
        this._language = language || LANGUAGE_API.RUSSIA;
        this._isServiceAccount = false;
        this._isESIAVerified = false;
        this._isESIALinked = false;
        this._isTinkoffLinked = false;
        this._isTinkoffVerified = false;
        this._isSberVerified = false;
        this._oauthLinked = [];
        this._oauthVerification = [];
        this._verificationStatus = "";
        this._promoVerifications = [];
    }

    init() {
        return MethodVKAPI.call(this, {
            group: METHOD_GROUP_TYPE.ACCOUNT,
            method: METHOD_ACCOUNT_TYPES.GET_PROFILE_INFO
        })
            .then((info) => {
                info = info.response;
                this._id = +info.id;
                this._screenName = info.screen_name;
                this._firstName = info.first_name;
                this._lastName = info.last_name;
                this._birthDate = info.bdate;
                const [day, month, year] = info.bdate.split(".");
                this._birthDateTS.setFullYear(year, month, day);
                this._birthDateVisibility = info.bdate_visibility;
                this._sex = info.sex;
                if(info.account_verification_profile) {
                    const verifInfo = info.account_verification_profile;
                    this._verifFirstName = verifInfo.first_name;
                    this._verifLastName = verifInfo.last_name;
                    this._verifBirthDate = verifInfo.birthdate;
                    const [day, month, year] = verifInfo.birthdate.split(".");
                    this._verifBirthDateTS.setFullYear(year, month, day);
                    this._verifSex = verifInfo.sex;
                }
                this._cityID = info.city.id;
                this._cityTitle = info.city.title;
                this._countryID = info.country.id;
                this._countryTitle = info.country.title;
                this._phone = info.phone;
                this._relation = info.relation;
                this._status = info.status;
                this._photo = info.photo_200;
                this._homeTown = info.home_town;
                this._isServiceAccount = info.is_service_account;
                this._isESIAVerified = info.is_esia_verified;
                this._isESIALinked = info.is_esia_linked;
                this._isTinkoffLinked = info.is_tinkoff_linked;
                this._isTinkoffVerified = info.is_tinkoff_verified;
                this._isSberVerified = info.is_sber_verified;
                this._oauthLinked.length = 0;
                this._oauthLinked.push(...info.oauth_linked);
                this._oauthVerification.length = 0;
                this._oauthVerification.push(...info.oauth_verification);
                this._verificationStatus = info.verification_status;
                this._promoVerifications.length = 0;
                this._promoVerifications.push(...info.promo_verifications);

                this._isInit = true;
            });
    }

    processCaptcha(sid, key) {

    }

    async callMethod(method, params) {

    }

    get isInit() {
        return this._isInit;
    }

    get token() {
        return this._token;
    }

    get id() {
        return this._id;
    }

    get language() {
        return this._language;
    }

    set language(value) {
        if(typeof value === "string") value = LANGUAGE_API.getByName(value);
        if(!LANGUAGE_API.isValid(value)) return;
        this._language = value;
    }
}