const Constants = require('./constants.js');
const fetch = require('node-fetch');


//WEATHER
async function retrieveWeather(zipCode) {
    let url = Constants.Weather.CurrentUrl.format(zipCode) + Constants.Weather.ApiKey;
    let result = await fetch(url)
        .then(response => response.json());
    return result;
}
async function retrieveForecast(zipCode) {
    let url = Constants.Weather.ForecastUrl.format(zipCode) + Constants.Weather.ApiKey;
    let result = await fetch(url)
        .then(response => response.json());
    return result;
}

//NEWS
async function retrieveNews() {
    let result = await fetch(Constants.NewsApi.Url + Constants.NewsApi.ApiKey)
        .then(response => response.json());
    return result;
}

//TEST
async function test() {
    console.log(JSON.stringify(Constants));
    let currentWeather = await retrieveWeather('95391');
    console.log(currentWeather);

    let forecastWeather = await retrieveForecast('95391');    
    console.log(forecastWeather);

    let news = await retrieveNews();
    console.log(news);
}