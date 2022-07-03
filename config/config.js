const fs = require("fs");
let configJson;

try {
  const data = fs.readFileSync(__dirname + "/config.json", "utf8");
  configJson = JSON.parse(data);
} catch (err) {
  console.log("Error loading config.json file");
}

module.exports = configJson;
