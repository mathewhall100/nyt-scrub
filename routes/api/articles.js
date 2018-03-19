const router = require("express").Router();
const dbController = require("../../controllers/dbController");

// Database routes

// Matches with "/api/articles"
router.route("/")                     
  .get(dbController.findAll)           // route to fetch all artcilces from Articles collection
  .post(dbController.create);          // route to create a new article in the Articles collection

// Matches with "/api/articles/:id"   

router.route("/:id")                    
  .delete(dbController.remove);        // route to delete an article from Articles collection

module.exports = router;


