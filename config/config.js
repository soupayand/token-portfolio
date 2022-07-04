const fs = require("fs");
let config;

try {
  const data = fs.readFileSync(__dirname + "/config.json", "utf8");
  config = JSON.parse(data);
} catch (err) {
  console.log("Error loading config.json file");
}

module.exports = config;
