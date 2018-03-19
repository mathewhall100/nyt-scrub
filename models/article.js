const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  section: String,                      // docs.section_name
  headline: { type: String, required: true },     // docs.headline.main
  abstract: String,                      // docs.abstract
  date: { type: Date, required: true },           // docs.pub_date
  image: String,                         // docs.multimedia[2].url - 75px*75px image
  url: { type: String, required: true  },         // docs.web_url
  by: String                           // docs.byline.original

});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;

