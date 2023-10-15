export class NeedCaptcha {

    constructor(session, group, method, queryParams, requestParams, response) {
        this.isNeedCaptcha = true;
        this.session = session;
        this.response = response;
        this.sid = response.captcha_sid;
        this.img = response.captcha_img;

        this.send = function (key) {
            queryParams.captcha_sid = response.captcha_sid;
            queryParams.captcha_key = key;
            return session.callMethod(group, method, queryParams, requestParams);
        }
    }
}