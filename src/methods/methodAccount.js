import {MethodVKAPI} from "./methodVKAPI.js";
import {methodGroupType} from "./methodGroupType.js";
import {typesMethodAccount} from "./types/index.js";


export class MethodAccount extends MethodVKAPI{
    static _groupType = methodGroupType.ACCOUNT;
    static types = typesMethodAccount;

    constructor(version) {
        super(version);
        this._groupType = methodGroupType.ACCOUNT;
    }
}