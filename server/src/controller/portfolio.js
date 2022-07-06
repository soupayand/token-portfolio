const logger = require("../logging/logger");
const con = require("../../../database/dbsetup");
const portfolioQuery = require("./queries/portfolio-queries");
const cryptocompare = require("../external-apis/cryptocompare");

getTimestampFromDate = (date) => {
  let timestampInMilli = new Date(date).getTime();
  return timestampInMilli / 1000;
};

getCurrentPortfolioValuation = (holdings, currentPrice) => {
  data = [];
  for (i = 0; i < holdings.length; i++) {
    rec = holdings[i];
    obj = {};
    token = rec["token"];
    obj["token"] = token;
    quantity = rec["quantity"];
    obj["quantity"] = quantity;
    priceInUsd = currentPrice[token]["USD"];
    obj["currentPriceInUsd"] = priceInUsd;
    obj["tokenValueInUsd"] = quantity * priceInUsd;
    data.push(obj);
  }
  return data;
};

exports.portfolio = (req, res, next) => {
  logger.info("Retrieving current portfolio value");
  userId = req.params.userId;
  let filter = " WHERE user_id = ? ";
  values = [];
  holdings = [];
  values.push(userId);
  date = req.query.date;
  if (date) {
    startTimestamp = getTimestampFromDate(date + " 00:00:00");
    values.push(startTimestamp);
    endTimestamp = getTimestampFromDate(date + " 23:59:59");
    values.push(endTimestamp);
    filter = filter + "AND (timestamp >= ? AND timestamp <= ?) ";
  }
  queryStr = portfolioQuery.getAllTokenQuantity(filter);
  con
    .query(queryStr, values)
    .then((data) => {
      return data;
    })
    .then((data) => {
      holdings = data;
      tokens = data.map((value) => value["token"]);
      return cryptocompare.getPrice(tokens);
    })
    .then((data) => {
      logger.info("Successfully retrieved portfolio value for tokens");
      res.status(200).json(getCurrentPortfolioValuation(holdings, data));
    })
    .catch((err) => {
      logger.error("Error retrieving portfolio value for tokens");
      res.status(500).json({ message: "Unable to retrieve portfolio" });
    });
};

exports.tokenValue = (req, res, next) => {
  token = req.params.token.toUpperCase();
  userId = req.params.userId;
  logger.info(`Retreiving porfolio value for token ${token}`);
  let filter = " WHERE user_id = ? AND token = ? ";
  values = [];
  result = [];
  values.push(userId);
  values.push(token);
  date = req.query.date;
  if (date) {
    startTimestamp = getTimestampFromDate(date + " 00:00:00");
    values.push(startTimestamp);
    endTimestamp = getTimestampFromDate(date + " 23:59:59");
    values.push(endTimestamp);
    filter = filter + "AND (timestamp >= ? AND timestamp <= ?) ";
  }
  queryStr = portfolioQuery.getTokenQuantity(filter);
  con
    .query(queryStr, values)
    .then((data) => {
      return data;
    })
    .then((data) => {
      result = data;
      return cryptocompare.getPrice([token]);
    })
    .then((data) => {
      logger.info(`Successfully retrieved portfolio value for token ${token}`);
      res.status(200).json(getCurrentPortfolioValuation(result, data));
    })
    .catch((err) => {
      logger.error(`Error retrieving portfolio value for token ${token}`);
      res.status(500).json({
        message: `Unable to retrieve portfolio value for token ${token}`,
      });
    });
};
