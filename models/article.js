const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  section: { type: String },                      // docs.section_name
  headline: { type: String, required: true },     // docs.headline.main
  abstract: {type: String },                      // docs.abstract
  date: { type: Date, required: true },           // docs.pub_date
  image: {type: String },                         // docs.multimedia[2].url - 75px*75px image (other sizes available)
  url: { type: String, required: true  },         // docs.web_url
  by: { type: String }                            // docs.byline.original

});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;

