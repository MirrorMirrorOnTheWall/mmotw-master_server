const API_KEY = '1284b9c003c91d9ad350d224e7b9c83f'
const fetch = require('node-fetch');

async function retrieveCurrentWeather(zipCode) {
    const url = 'https://api.openweathermap.org/data/2.5/weather?zip=' + zipCode + ',us&appid=' + API_KEY;
    let result = await fetch(url)
        .then(response => response.json());
    return result;
}
async function retrieveFiveDayForecast(zipCode) {
    const url = 'https://api.openweathermap.org/data/2.5/forecast?zip=' + zipCode + ',us&appid=' + API_KEY;
    let result = await fetch(url)
        .then(response => response.json());
    return result;
}

async function test() {
    let currentWeather = await retrieveCurrentWeather('95391');
    console.log(currentWeather);

    let forecastWeather = await retrieveFiveDayForecast('95391');    
    console.log(forecastWeather);
}