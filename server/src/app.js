const fs = require("fs");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const logger = require("./logging/logger");
const portfolioRouter = require("./routes/portfolio");
const userRouter = require("./routes/user");

app.use(bodyParser.json());
app.use("/user", userRouter);
app.use("/portfolio", portfolioRouter);

app.get("/about", (req, res) => {
  res.end(
    "This solution tracks the portfolio value of tokens based on user transactions"
  );
});

module.exports = app;
