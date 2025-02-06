// F1: Web UI Weather Search Automation

const { test, expect, request } = require('@playwright/test');
const { dataConfigs } = require('./config/dataConfigs.js');
const { SearchPage } = require('./pages/SearchPage.js');
const { updateDataToExcel } = require('./excel/updateToExcel.js');

test('F1: Web UI Automation', webUIAutomation);

async function webUIAutomation({ page }){

    const { webUIConfigs } = dataConfigs;
    const { baseURL, city } = webUIConfigs;

    const searchPage = new SearchPage(page);

    // Visit the weather url
    await searchPage.openWeatherUrl(baseURL);

    // Search weather of a specific city;
    const weatherData = await searchPage.searchCityWeather(city);

    // Update the data into an Excel file;
    console.log('Weather Data', weatherData);
    await updateDataToExcel(weatherData, './tests/excel/weatherData.xlsx');
}