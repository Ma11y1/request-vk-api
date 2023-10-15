import { LONG_POOL_MODE, LONG_POOL_NEED_PTS, LONG_POOL_VERSION, LONG_POOL_WAIT } from "./constants.js";
import { Request } from "./request.js";
import EventEmitter from "events";
import { METHOD_GROUP_TYPE } from "./methods/index.js";
import { ErrorAPI, METHOD_API_ERROR_CODE } from "./errors/index.js";


const EVENT_CONNECT = "connect";
const EVENT_DISCONNECT = "disconnect"
const EVENT_UPDATE = "update";
const EVENT_UPDATE_SERVER = "updateServer";
const EVENT_ERROR = "error";

/**
 * Events:
 *      connect - connect to server;
 *      disconnect - disconnect server;
 *      update - appearance of a new event on the server;
 *      updateServer - server data update;
 *      error;
 */
export class LongPoolServer extends EventEmitter {

    constructor(session) {
        super();
        this._session = session;
        this._abortController = new AbortController();

        this._url = null;
        this._key = null;
        this._ts = null;

        this._needPts = 1;
        this.groupID = null;

        this._wait = null;
        this._mode = null;
        this._version = null;

        this.isAutoReconnect = true;
        this._isConnected = false;
        this._isInit = false;
    }

    /**
     * @description Initialization server
     * @param { { needPts: 0 | 1, groupID: number, wait: number, mode: number, version: mode }  } params
     * @param { Object } requestParams
     * @returns { Promise<void> }
     */
    async init(params, requestParams) {
        if(!params) params = {};

        this._needPts = params.needPts || LONG_POOL_NEED_PTS;
        this.groupID = params.groupID || null;
        this._wait = params.wait || LONG_POOL_WAIT;
        this._mode = params.mode || LONG_POOL_MODE;
        this._version = params.version || LONG_POOL_VERSION;

        const queryParams = {}
        if(this._needPts) queryParams.need_pts = this._needPts;
        if(this.groupID) queryParams.group_id = this.groupID;
        if(this._version) queryParams.lp_version = this._version;

        const server = await this._session.callMethod(
            METHOD_GROUP_TYPE.MESSAGES,
            "getLongPollServer",
            queryParams,
            requestParams
        );

        if(server.response && server.response.server) {
            this._url = `https://${ server.response.server }`;
            this._key = server.response.key;
            this._ts = server.response.ts;

            this._isInit = true;
        } else {
            throw new ErrorAPI(METHOD_API_ERROR_CODE.UPDATE_LONG_POOL_SERVER, `Error initialization long pool server. Invalid params server: ${ server }`, {});
        }
    }

    /**
     * @description Update server data
     * @returns {Promise<void>}
     */
    async update() {
        if(!this._isInit) return;
        this._isConnected = false;

        const server = await this._session.callMethod(
            METHOD_GROUP_TYPE.MESSAGES,
            "getLongPollServer",
            {
                need_pts: this._needPts,
                group_id: this.groupID,
                lp_version: this._version
            }
        );

        if(server.response && server.response.server) {
            this._url = server.response.server;
            this._key = server.response.key;
            this._ts = server.response.ts;

            this.emit(EVENT_UPDATE_SERVER, this);
        } else {
            throw new ErrorAPI(METHOD_API_ERROR_CODE.INIT_LONG_POOL_SERVER, `Error update long pool server. Invalid params server: ${ server }`, {});
        }
    }

    /**
     * @description Connect to server
     * @returns { Promise<void> }
     */
    async connect() {
        if(!this.isConnected) {
            this._isConnected = true;
            this.emit(EVENT_CONNECT, this);
        }

        let response;
        try {
            this._abortController = new AbortController();

            response = await Request.getJSON(
                `${ this._url }?act=a_check&key=${ this._key }&ts=${ this._ts }&wait=${ this._wait }&mode=${ this._mode }&version=${ this._version }`,
                { signal: this._abortController.signal }
            );
        } catch(err) {
            this._isConnected = false;
            this.emit(EVENT_ERROR, err, this);
            this.emit(EVENT_DISCONNECT, this);
            return;
        }

        if(response.failed) {
            switch(response.failed) {
                case 1: {
                    this._ts = response.ts;
                    break;
                }
                case 2:
                case 3: {
                    this._isConnected = false;
                    await this.update();
                    if(this.isAutoReconnect) {
                        this.connect();
                    } else {
                        this.emit(EVENT_DISCONNECT, this);
                    }
                    break;
                }
                case 4: {
                    this._isConnected = false;
                    this.emit(EVENT_DISCONNECT, this);
                    break;
                }
            }

            this.emit(EVENT_ERROR, response);
        }

        if(response.updates) {
            this._ts = response.ts;

            this.emit(EVENT_UPDATE, response.updates, this);

            if(this.isAutoReconnect) {
                this.connect();
            }
        }
    }

    /**
     * @description Disconnect from server
     */
    disconnect() {
        this._abortController.abort();
        this.emit(EVENT_DISCONNECT, this);
    }

    set wait(value) {
        if(isNaN(value)) return;
        if(value > 90) value = 90;
        if(value < 0) value = 0;
        this._wait = value;
    }

    set mode(value) {
        if(isNaN(value)) return;
        this._mode = value;
    }

    set version(value) {
        if(isNaN(value)) return;
        this._version = value;
    }

    set needPts(value) {
        this._needPts = Number(!!value);
    }

    get url() {
        return this._url;
    }

    get ts() {
        return this._ts;
    }

    get needPts() {
        return this._needPts;
    }

    get wait() {
        return this._wait;
    }

    get mode() {
        return this._mode;
    }

    get version() {
        return this._version;
    }

    get isInit() {
        return this._isInit;
    }

    get isConnected() {
        return this._isConnected;
    }
}