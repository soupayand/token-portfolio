const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const portfolioController = require("../controller/portfolio");

router.post("/register", userController.register);
router.get("/:id/load", userController.load);
router.get("/:userId/portfolio", portfolioController.portfolio);
router.get("/:userId/portfolio/:token", portfolioController.tokenValue);

module.exports = router;
