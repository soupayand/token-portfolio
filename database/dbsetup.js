const mysql = require("mysql");
const logger = require("../server/src/logging/logger");
const config = require("../config/config");
const dbConf = config.database;
const setupDbHelper = require("./dbsetup-queries");

const con = mysql.createPool({
  connectionLimit: dbConf.poolSize,
  database: dbConf.name,
  host: dbConf.host,
  user: dbConf.user,
  password: dbConf.password,
  connectTimeout: dbConf.connectionTimeout,
  acquireTimeout: dbConf.acquireTimeout,
});

const query = (queryStr, values) => {
  return new Promise((resolve, reject) => {
    con.query(queryStr, values, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
        logger.error(
          `Error executing query -> ${queryStr} with values ${values}`
        );
      } else {
        results = JSON.parse(JSON.stringify(result));
        logger.info(`Successfully executed query -> ${queryStr}`);
        resolve(results);
      }
    });
  });
};

//query(setupDbHelper.createDatabase);
query(setupDbHelper.createUserTbl);
query(setupDbHelper.createTransactionTbl);
query(setupDbHelper.dataLoadStatusTbl);

module.exports = {
  con,
  query,
};
