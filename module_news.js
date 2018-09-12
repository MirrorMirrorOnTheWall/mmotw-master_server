const API_KEY = '0c2959435a2a48bca0747a10df2a7623';
const NewsAPI = require('newsapi');

async function retrieveNews() {
    const newsapi = new NewsAPI(API_KEY);
    let result = await newsapi.v2.topHeadlines({
        //category: 'technology',
        language: 'en',
        country: 'us'
      }).then(response => response.articles);
    return result;
}

async function test() {
    let news = await retrieveNews();
    console.log(news);
}