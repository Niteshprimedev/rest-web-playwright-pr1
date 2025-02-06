class SearchPage {
    constructor(page){
        this.page = page;
        this.formEl = page.locator('form');
        this.searchLocationInputEl = this.formEl.locator('input#LocationSearch_input').and(page.getByPlaceholder('Search City or Postcode'));
    }

    async openWeatherUrl(url){
        await this.page.goto(url);
        await this.page.waitForLoadState('load');
    }

    async searchCityWeather(city){
        const weatherData = [];

        await this.searchLocationInputEl.fill(city);
        await this.page.waitForLoadState('load');

        // Select the first option from the dropdown;
        await this.page.waitForTimeout(2000);
        await this.page.keyboard.press('ArrowDown'); 
        await this.page.keyboard.press('Enter'); 

        // Wait for the page to load fully
        await this.page.waitForLoadState('load');

        // Locate the temperature, humidity, and wind speed on the page
        const temperatureEl = this.page.locator('#todayDetails').getByTestId("TemperatureValue");
        const temperatureData = await temperatureEl.first().textContent();
        const weatherDetailsEls = this.page.getByTestId("WeatherDetailsListItem");
        const cityWindSpeedEl = await weatherDetailsEls.nth(1);
        const cityHumidityEl = await weatherDetailsEls.nth(2);
        
        const windCityData = await this.getWeatherData(cityWindSpeedEl);
        const humidityData = await this.getWeatherData(cityHumidityEl);

        // Capture the weather data
        weatherData.push(['Temperature', temperatureData]);
        weatherData.push(humidityData);
        weatherData.push(windCityData);

        return weatherData;
    }

    async getWeatherData(element){
        const elsData = [];

        for(let idxI = 0; idxI < 2; idxI++){
            const childEl = await element.locator(`div`).nth(idxI);
            const childElTxt = await childEl.textContent();

            elsData.push(childElTxt);
        }

        // Handle Wind Direction;
        const elsDataIdx1Item = elsData[1];
        const regExp = new RegExp('Wind Direction');
        const isWindDirIncluded = regExp.test(elsDataIdx1Item);
        
        if(isWindDirIncluded){
            elsData[1] = elsDataIdx1Item.split('Wind Direction')[1];
        }
        
        return elsData;
    }
}

module.exports = { SearchPage };