const JsonDB = require("node-json-db");
const db = new JsonDB("icmpDb", true, global.isDebugMode);
module.exports = () => {
    return db;
};
