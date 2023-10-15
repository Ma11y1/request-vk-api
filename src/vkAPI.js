import { VERSION_API } from "./constants.js";


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