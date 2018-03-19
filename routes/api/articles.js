const router = require("express").Router();
const dbController = require("../../controllers/dbController");

// Matches with "/api/articles"
router.route("/")                     
  .get(dbController.fetchArticles)    // route to fetch all artcilces from NYT api
  .post(dbController.create);         // route to create a new article in the articles db

// Matches with "/api/articles/:id"   

router.route("/:id")                    
  .delete(dbController.remove);       // route to delete an article from articles db

module.exports = router;


