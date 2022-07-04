const zlib = require("zlib");
const logger = require("../logging/logger");
const con = require("../../../database/dbsetup");
const userQuery = require("./queries/user-queries");

const conf = (exports.register = (req, res, next) => {
  let reqBody = req.body;
  values = [];
  values.push(reqBody["firstName"]);
  values.push(reqBody["lastName"]);
  con
    .query(userQuery.addUser, values)
    .then((data) => {
      return data;
    })
    .then((data) => {
      con.query(userQuery.getUserByFirstLastName, values).then((data) => {
        res.status(200).json(data);
      });
    })
    .catch((err) => {
      logger.error("Error registering user", err);
    });
});

exports.load = (req, res, next) => {};
