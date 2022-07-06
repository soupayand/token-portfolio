const logger = require("../logging/logger");
const axios = require("axios");

const conf = require("../../../config/config");
const cryptoConf = conf.cryptocompare;

const cryptocompareHost = "https://min-api.cryptocompare.com/data/";
const headers = {
  authorization: "Apikey " + cryptoConf.apiKey,
};

exports.getPrice = (tokens) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        cryptocompareHost +
          "pricemulti?fsyms=" +
          tokens.toString() +
          "&tsyms=USD",
        { header: headers }
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        throw err;
      });
  });
};
