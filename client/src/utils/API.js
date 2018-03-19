import axios from "axios";

// query NYT API

const authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
const queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=";

export default {

 queryNYT: function (topic, startYear, endYear) {
   return axios.get(queryURLBase + topic + "&begin_date" + startYear + "&end_date" + endYear);

  },

  // Gets all saved articles from database
  getArticles: function () {
    return axios.get("api/articles");
  },

  // Deletes a saved article with the given id
  deleteArticle: function (id) {
    return axios.delete("/api/articles/" + id);
  },

  // Saves a new article o the database
  saveArticle: function (articleData) {
    return axios.post("/api/articles", articleData);
  }
};