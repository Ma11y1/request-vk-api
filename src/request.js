import https from "https";
import FormData from "form-data";


function doRequest(url, params, postData) {
    return new Promise((resolve, reject) => {
        const request = https.request(url, params, (response) => {
            response.setEncoding("utf-8");
            let data = "";
            response.on("data", (chunk) => data += chunk);
            response.on("end", () => resolve(data));
        });

        request.on("error", reject);

        if(postData) {
            if(postData instanceof FormData) {
                postData.pipe(request);
            }else {
                request.write(postData);
                request.end();
            }
        }else {
            request.end();
        }
    });
}

export class Request {

    static get(url, requestParams = {}) {
        if(!url) throw new Error(`Invalid argument URL: ${url}`);

        requestParams.method = "GET";

        return doRequest(url, requestParams);
    }

    static async getJSON(url, requestParams = {}) {
        return JSON.parse(await Request.get(url, requestParams));
    }

    static post(url, requestParams = {}, postData) {
        if(!url) throw new Error(`Invalid argument URL: ${url}`);

        requestParams.method = "POST";

        return doRequest(url, requestParams, postData);
    }

    static async postJSON(url, requestParams = {}, postData) {
        return JSON.parse(await Request.post(url, requestParams, postData));
    }

    static async postFormData(url, requestParams = {}, postData) {
        const formData = new FormData();
        if(postData) {
            for(let key in postData) {
                formData.append(key, postData[key]);
            }
        }

        requestParams.headers = formData.getHeaders(requestParams.headers);

        return Request.postJSON(url, requestParams, formData);
    }
}