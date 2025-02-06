class APIAutomation {
    constructor(baseURL, expect, requestCtx){
        this.baseURL = baseURL;
        this.expect = expect;
        this.requestCtx = requestCtx;
    }
    
    // Making a POST Request;
    async post(resource, params, bodyPayload){
        const postResponse = await this.requestCtx.post(`${this.baseURL}${resource}${params}`, { data: bodyPayload });
        await this.expect(postResponse.ok()).toBeTruthy();
        const postResponseData = await postResponse.json();

        return postResponseData;
    }

    // Making a GET Request;
    async get(resource, placeId, params){
        const getResponse = await this.requestCtx.get(`${this.baseURL}${resource}${placeId}${params}`);
        await this.expect(getResponse.ok()).toBeTruthy();
        const getResponseData = await getResponse.json();

        return getResponseData;
    }

    // Making a PUT Request;
    async put(resource, placeId, params, bodyPayload){
        const putResponse = await this.requestCtx.put(`${this.baseURL}${resource}${placeId}${params}`, { data: bodyPayload });
        await this.expect(putResponse.ok()).toBeTruthy();
        const putResponseData = await putResponse.json();

        return putResponseData;
    }
    
    // Making a DELETE Request;
    async delete(resource, params, bodyPayload){
        const deleteResponse = await this.requestCtx.delete(`${this.baseURL}${resource}${params}`, { data: bodyPayload });
        await this.expect(deleteResponse.ok()).toBeTruthy();
        const deleteResponseData = await deleteResponse.json();

        return deleteResponseData;
    }
}
module.exports = { APIAutomation };