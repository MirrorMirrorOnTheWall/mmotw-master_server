var Constants = {
    Weather: {
        ApiKey: `1284b9c003c91d9ad350d224e7b9c83f`,
        CurrentUrl: `https://api.openweathermap.org/data/2.5/weather?zip={0},us&appid=`,
        ForecastUrl: `https://api.openweathermap.org/data/2.5/forecast?zip={0},us&appid=`,
        RefreshInterval: 1000 * 60 * 60
    },  
    NewsApi : {
        ApiKey: `0c2959435a2a48bca0747a10df2a7623`,
        Url: `https://newsapi.org/v2/top-headlines?country=us&apiKey=`,
        RefreshInterval: 1000 * 60 * 60
    }
}

String.prototype.format = function() {
    a = this;
    for (k in arguments) {
        a = a.replace("{" + k + "}", arguments[k])
    }
    return a
}

module.exports = Constants;