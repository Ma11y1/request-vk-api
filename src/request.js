import https from "https";


function doRequest(url, params, postData) {
    return new Promise((resolve, reject) => {
        const request = https.request(url, params, (response) => {
            response.setEncoding("utf-8");
            let data = "";
            response.on("data", (chunk) => data += chunk);
            response.on("end", () => resolve(data));
        });

        request.on("error", reject);

        if(postData) request.write(postData);

        request.end();
    });
}

export class Request {

    static get(url, params = {}) {
        if(!url) throw new Error(`Invalid argument URL: ${url}`);
        console.log(url)
        params.method = "GET";

        return doRequest(url, params);
    }

    static async getJSON(url, params = {}) {
        return JSON.parse(await Request.get(url, params));
    }

    static post(url, params = {}, postData) {
        if(!url) throw new Error(`Invalid argument URL: ${url}`);

        params.method = "POST";

        return doRequest(url, params, postData);
    }
}