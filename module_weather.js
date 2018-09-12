const API_KEY = '1284b9c003c91d9ad350d224e7b9c83f'
const fetch = require('node-fetch');

function retrieveCurrentWeather(zipCode) {
    var url = 'https://api.openweathermap.org/data/2.5/weather?zip=' + zipCode + ',us&appid=' + API_KEY;
    return fetch(url)
        .then(response => {
            return response.json();
        });
}
function retrieveFiveDayForecast(zipCode) {
    var url = 'https://api.openweathermap.org/data/2.5/forecast?zip=' + zipCode + ',us&appid=' + API_KEY;
    return fetch(url)
        .then(response => {
            return response.json();
        });
}

function test() {
    retrieveCurrentWeather('95391').then(response => {
        console.log(response);
    });
    
    retrieveFiveDayForecast('95391').then(response => {
        console.log(response);
    });
}