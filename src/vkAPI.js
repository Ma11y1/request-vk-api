import {VERSION_API, TOKEN} from "./constants.js";
import {VKSession} from "./vkSession.js";
import * as https from "https";
import {Request} from "./request.js";



//TODO Реализовать работу с Long Poll API
//TODO Реализовать работу с ботом
//TODO Переделать request на работу через https

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


