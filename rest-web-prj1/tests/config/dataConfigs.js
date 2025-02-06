require('dotenv').config();
const dataConfigs = {
    restApiConfigs:{
        baseURL: `${process.env.BASEURL}`,
        postConfigs: {
            resource: `${process.env.POST_RESC}`,
            params: `?key=${process.env.KEY}`,
            bodyPayload: {
                "location": {
                "lat": "-38.383494",
                "lng": 33.427362
                },
                "accuracy": 50,
                
                "name": "Frontline house",
                "phone_number": "(+91) 983 893 3937",
                "address": "29, side layout, cohen 09",
                "types": [
                "shoe park",
                "shop"
                ],
                "website": "http://google.com",
                "language": "French-IN"
            },
        },
        deleteConfigs: {
            resource:  `${process.env.DELETE_RESC}`,
            params: `?key=${process.env.KEY}`,
            bodyPayload: { "place_id": process.env.PLACE_ID }, // hard coded place_id 
            // & to be updated in the delete test case;
        },
        getConfigs: {
            resource:  `${process.env.GET_RESC}`,
            params: `&key=${process.env.KEY}`,
            place_id: process.env.PLACE_ID // hard coded place_id 
            // & to be updated in the delete test case;
        },
        putConfigs: {
            resource:  `${process.env.PUT_RESC}`,
            params: `&key=${process.env.KEY}`,
            place_id: process.env.PLACE_ID,
            bodyPayload: { "place_id": process.env.PLACE_ID, "address": "70 Summer walk, USA", "key": process.env.KEY },
            // hard coded place_id 
            // & to be updated in the delete test case;
        }
    },
    webUIConfigs:{
        baseURL: 'https://weather.com/',
        city: 'Mumbai',
    }
};

module.exports = { dataConfigs };