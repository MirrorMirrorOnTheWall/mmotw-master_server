const API_KEY = '0c2959435a2a48bca0747a10df2a7623';
const NewsAPI = require('newsapi');

function retrieveNews() {
    const newsapi = new NewsAPI(API_KEY);
    return newsapi.v2.topHeadlines({
        //category: 'technology',
        language: 'en',
        country: 'us'
      }).then(response => {
        return response;
      });
}

function test() {
    retrieveNews().then(news => {
        console.log(news.articles);
    });
}