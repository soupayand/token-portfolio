const winston = require("winston");
const format = winston.format;
const { combine, timestamp, label, printf } = format;
const config = require("../../../config/config");
const logConf = config.logging;

logFormat = winston.format.printf((info) => {
  const formattedDate = info.timestamp;
  return `${formattedDate}| ${info.level} | ${info.message}.`;
});

const logger = winston.createLogger({
  exitOnError: false,
  level: "error",
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat),
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({
      filename: __dirname + "/../../logs/" + logConf.errorFile,
      level: "error",
    }),
    new winston.transports.File({
      filename: __dirname + "/../../logs/" + logConf.combinedFile,
      level: "info",
    }),
  ],
});

module.exports = logger;
