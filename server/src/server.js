const log = require("./logging/logger");
const config = require("./../../config/config");
const con = require("../../database/dbsetup");
const serverConf = config.server;

const http = require("http");
const app = require("./app");

const port = serverConf.port;
const host = serverConf.host;
const server = http.createServer(app);

server.listen(port, host, () => {
  log.info(`Server started on host ${host} and port ${port}`);
});
