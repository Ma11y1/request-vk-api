export class ErrorAPI extends Error {

    constructor({ code, message }) {
        super(message);

        this.code = code;
        this.name = this.constructor.name;
    }

    get [Symbol.toStringTag]() {
        return this.constructor.name;
    }

    toJSON() {
        const json = {};

        for(const key of Object.getOwnPropertyNames(this)) {
            json[key] = this[key];
        }

        return json;
    }
}
