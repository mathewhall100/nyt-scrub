const router = require("express").Router();
const articleRoutes = require("./articles");

// Article routes
router.use("/article", articleRoutes);

module.exports = router;
