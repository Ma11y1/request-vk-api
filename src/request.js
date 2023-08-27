import fetch from "node-fetch";
import {REQUEST_ABORT_TIMEOUT} from "./constants.js";


export async function request(url, params = {}) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_ABORT_TIMEOUT);

    params.signal = controller.signal;
    params.compress = false;

    try {
        return await fetch(url, params);
    } finally {
        clearTimeout(timeout);
    }
}

export async function requestText(url, params = {}) {
    return (await request(url, params)).text()
}

export async function requestJSON(url, params = {}) {
    return (await request(url, params)).json()
}

export async function requestBlob(url, params = {}) {
    return (await request(url, params)).blob()
}

export async function requestArrayBuffer(url, params = {}) {
    return (await request(url, params)).arrayBuffer()
}