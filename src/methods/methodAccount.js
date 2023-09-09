import {MethodVKAPI} from "./methodVKAPI.js";
import {METHOD_GROUP_TYPE} from "./methodGroupType.js";
import {TYPES_METHOD_ACCOUNT} from "./types/index.js";


export class MethodAccount extends MethodVKAPI{
    static _groupType = METHOD_GROUP_TYPE.ACCOUNT;
    static types = TYPES_METHOD_ACCOUNT;

    constructor(version) {
        super(version);
        this._groupType = METHOD_GROUP_TYPE.ACCOUNT;
    }

    async getInfo(session) {

    }

    static async getInfo(session) {
        return await super.callJSON({
            session: session,
            group: METHOD_GROUP_TYPE.ACCOUNT,
            method: TYPES_METHOD_ACCOUNT.GET_INFO
        });
    }
}