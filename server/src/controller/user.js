const extract = require("extract-zip");
const fastcsv = require("fast-csv");
const fs = require("fs");

const logger = require("../logging/logger");
const con = require("../../../database/dbsetup");
const userQuery = require("./queries/user-queries");

const chunkSize = 10;

unzip = async (source, target) => {
  try {
    await extract(source, { dir: target });
    logger.info("Source data extraction complete");
  } catch (err) {
    logger.error("Failed to extract source data");
    throw err;
  }
};

loadData = (userId) => {
  return new Promise((resolve, reject) => {
    con.query(userQuery.updateLoadStatus, ["IN_PROGRESS", userId]);
    console.time("loading");
    let stream = fs.createReadStream(
      __dirname + "/../../data/output/transactions.csv"
    );
    let csvData = [];
    try {
      let csvStream = fastcsv
        .parse({ headers: true })
        .on("data", (data) => {
          values = [];
          values.push(data.timestamp);
          values.push(data.transaction_type);
          values.push(data.token);
          values.push(data.amount);
          values.push(userId);
          csvData.push(values);
          if (csvData.length == chunkSize) {
            con.query(userQuery.loadTransactionData, csvData);
            csvData = [];
          }
        })
        .on("end", () => {
          logger.info("Data loading completed");
          if (csvData.length > 0) {
            con.query(userQuery.loadTransactionData, csvData);
          }
          con.query(userQuery.updateLoadStatus, ["COMPLETED", userId]);
          resolve();
        })
        .on("error", (err) => {
          throw err;
        });

      stream.pipe(csvStream);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

insertLoadStatus = (userId) => {
  try {
    con.query(userQuery.insertLoadStatusData, [userId]).then(() => {
      logger.info("Record inserted for load status table");
    });
  } catch (err) {
    throw err;
  }
};

updateLoadStatus = (status, userId) => {
  try {
    con.query(userQu, [status, userId]).then(() => {
      logger.info(`Updated load status for user ${userId} to ${status}`);
    });
  } catch (err) {
    throw err;
  }
};

exports.register = (req, res, next) => {
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
      return con.query(userQuery.getUserByFirstLastName, values);
    })
    .then((data) => {
      insertLoadStatus(data[0].id);
      res.status(201).json(data);
    })
    .catch((err) => {
      logger.error("Error registering user", err);
      res.status(500).json({ message: "Error registering user" });
    });
};

exports.load = (req, res, next) => {
  userId = req.params.id;
  unzip(
    __dirname + "/../../data/transactions.csv.zip",
    __dirname + "/../../data/output/"
  )
    .then(() => {
      logger.info("Starting data load");
      loadData(userId);
    })
    .then(() => {
      res.status(200).json({
        message:
          "Data loading has begun. Please check the status after some time",
      });
    })
    .catch((err) => {
      logger.error("Error loading data", err);
      res.send(500).json({ message: "Error laoding data" });
    });
};

exports.loadStatus = (req, res, next) => {
  userId = req.params.id;
  con
    .query(userQuery.getLoadStatus, [userId])
    .then((data) => {
      res.send(200).json({ status: data });
    })
    .catch((err) => {
      res.send(500).json({ message: "Unable to retrive current load status" });
    });
};
