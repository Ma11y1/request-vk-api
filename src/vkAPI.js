import {API_VERSION} from "./constants.js";

console.log(111)
//TODO Реализовать работу с Long Poll API
//TODO Реализовать работу с ботом
export class VKAPI {
    static version = API_VERSION;


    constructor({version = API_VERSION}) {
        this.version = version;
    }

    /**
     * @param { string } group
     * @param { string } method
     * @param { object } params
     */
    static call(group, method, params) {

    }

    auth(login, password, params) {

    }

    /**
     * @param { string } group
     * @param { string } method
     * @param { object } params
     */
    call(group, method, params) {

    }
}