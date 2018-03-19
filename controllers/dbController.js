const db = require("../models");
const axios = require("axios");

//--------------------------------------------
// Here we define the routes for NYT API access and database CRUD
//-------------------------------------------- 

module.exports = {

  findAll: function(req, res) {
    db.NYTReact
      .find(req.query)
     //.sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },


  create: function(req, res) {
    db.NYTReact
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },


  remove: function(req, res) {
    db.NYTReact
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
