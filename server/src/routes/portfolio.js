const express = require("express");
const router = express.Router();
const portfolioController = require("../controller/portfoilo");

router.get("/portfolio", portfolioController.portfolio);

module.exports = router;
