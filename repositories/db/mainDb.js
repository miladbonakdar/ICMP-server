const path = require("path");
const JsonDB = require("node-json-db");
const db = new JsonDB(
    path.join(__baseDirname, "database", "icmpMain.cache.json"),
    true,
    global.isDebugMode
);
module.exports = () => {
    return db;
};
