import axios from "axios";

// query NYT API

const authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
const queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=";

let start = "";
let end = "";

export default {

 queryNYT: function (topic, startYear, endYear) {
   start = (startYear ?  "&begin_date=" + startYear + "0101" : "")
   end = (endYear ?  "&end_date=" + endYear + "1231" : "")

   return axios.get(queryURLBase + topic + start + end);

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
    console.log(articleData);
    return axios.post("/api/articles", articleData);
  }
};