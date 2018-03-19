const db = require("../models");
const axios = require("axios");

//--------------------------------------------
// Here we define the routes for NYT API access and database CRUD
//-------------------------------------------- 

module.exports = {

  findAll: function(req, res) {
    db.Article
      .find(req.query)
     //.sort({ date: -1 })
      .then(dbResult => res.json(dbResult))
      .catch(err => res.status(422).json(err));
  },


  create: function(req, res) {
      console.log(req.body)
    db.Article
      .create(req.body)
      .then(dbResult => res.json(dbResult))
      .catch(err => res.status(422).json(err));
  },


  remove: function(req, res) {
    db.Article
      .findById({ _id: req.params.id })
      .then(dbResult => dbResult.remove())
      .then(dbResult => res.json(dbResult))
      .catch(err => res.status(422).json(err));
  }
};
