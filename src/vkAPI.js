import {VERSION_API} from "./constants.js";


//TODO Реализовать работу с Long Poll API
//TODO Реализовать работу с ботом

//TODO Доделать обработку ошибок
//TODO Дописать енум коды ошибок
export class VKAPI {
    static version = VERSION_API;


    constructor({version = VERSION_API}) {
        this.version = version;
    }

    /**
     * @param { string } group
     * @param { string } method
     * @param { Object } params
     */
    static call(group, method, params) {

    }

    /**
     * @param { string } group
     * @param { string } method
     * @param { Object } params
     */
    call(group, method, params) {

    }
}

