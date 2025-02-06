const { test, expect, request } = require('@playwright/test');
const { dataConfigs } = require('./config/dataConfigs.js');
const { APIAutomation } = require('./pages/APIAutomation.js');

let apiAutomation;
let generatedPlaceId;
// F2: Google Map REST API Automation
test.describe('Google Map Rest API Tests', async () => {
    const { restApiConfigs } = dataConfigs;
    
    // Initialize APIAutomatioin before all tests
    test.beforeAll(async () => {
        await initializeAPI();
    })
    
    // Function to initialize APIAutomation
    async function initializeAPI(){
        const { baseURL } = restApiConfigs;
        const requestCtx = await request.newContext();
        apiAutomation = new APIAutomation(baseURL, expect, requestCtx);
    }

    // Test for POST Request;
    test('POST Request: REST API Google Map Automation', async() => {
        await googleMapsPostRequest();
    });

    // Function for POST Request
    async function googleMapsPostRequest(){
        const { postConfigs } = restApiConfigs;
        const { resource: postResource, params: postParams, bodyPayload: postBodyPayload } = postConfigs;

        // Making a POST Request;
        const postResponseData = await apiAutomation.post(postResource, postParams, postBodyPayload);

        generatedPlaceId = postResponseData.place_id; // store the generated place_id;

        console.log('Post Response: ', postResponseData);
        console.log('POST Request: Rest API Google Map Automation is successful');
    }

    // Test for GET Request
    test('GET Request: REST API Google Map Automation', async() => {
        await googleMapsGetRequest();
    });

    // Function for GET Request
    async function googleMapsGetRequest() {
        const { getConfigs } = restApiConfigs;

        // Update the place_id with the generatedPlaceId
        if(generatedPlaceId){
            await updatePlaceId(getConfigs);
        }

        const { resource: getResource, params: getParams, place_id: getPlaceId } = getConfigs;


        // Making a GET Request;
        const getResponseData = await apiAutomation.get(getResource, getPlaceId, getParams);

        console.log('Get Response: ', getResponseData);
        console.log('GET Request: Rest API Google Map Automation is successful');
    }

    // Test for PUT Request
    test('PUT Request: REST API Google Map Automation', async() => {
        await googleMapsPutRequest();
    });

    // Function for PUT Request
    async function googleMapsPutRequest(){
        const { putConfigs } = restApiConfigs;

        // Update the place_id with the generatedPlaceId
        if(generatedPlaceId){
            await updatePlaceId(putConfigs);
        }

        const { resource: putResource, params: putParams, place_id: putPlaceId, bodyPayload: putBodyPayload } = putConfigs;


        // Making a PUT Request;
        const putResponseData = await apiAutomation.put(putResource, putPlaceId, putParams, putBodyPayload);

        console.log('Put Response: ', putResponseData);
        console.log('PUT Request: Rest API Google Map Automation is successful');
    }

    
    // Test for DELETE Request
    test('DELETE Request: Rest API Google Map Automation', async () => {
        await googleMapsDeleteRequest();
    });

    // Function for DELETE Request
    async function googleMapsDeleteRequest() {
        const { deleteConfigs } = restApiConfigs;
        const { resource: deleteResource, params: deleteParams, bodyPayload: deleteBodyPayload } = deleteConfigs;
    
        // Update the body payload with the generatedPlaceId
        if(generatedPlaceId){
        deleteBodyPayload.place_id = generatedPlaceId;
        }
        
        // Making a DELETE Request
        const deleteResponseData = await apiAutomation.delete(deleteResource, deleteParams, deleteBodyPayload);
    
        console.log('Delete Response: ', deleteResponseData);
        console.log('DELETE Request: Rest API Google Map Automation is successful');
    }

    async function updatePlaceId(configs){
        configs.place_id = generatedPlaceId;
        return;
    }
});