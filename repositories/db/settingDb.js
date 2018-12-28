const JsonDB = require("node-json-db");
const db = new JsonDB("settingDb", true, global.isDebugMode);
module.exports = () => {
    return db;
};
