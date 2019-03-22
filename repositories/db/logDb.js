const fs = require("fs");
const path = require("path");
const JsonDB = require("node-json-db");

/** TODO: add description
 *
 */
const getDbName = date => {
    return `${date.getNowFileName()}.log.json`;
};

/** TODO: add description
 *
 */
const checkFolderExistAndCreateIfNot = date => {
    let baseDir = path.join(__baseDirname, "database", "logs");
    if (!fs.existsSync(baseDir)) {
        fs.mkdirSync(baseDir, 744);
    }
    let dir = path.join(baseDir, `${date.getFullYear()}-${date.getMonth() + 1}`);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, 744);
    }
    return dir;
};

/** TODO: add description
 *
 */
const getDbPath = date => {
    return path.join(checkFolderExistAndCreateIfNot(date), getDbName(date));
};

/** TODO: add description
 *
 */
module.exports = date => {
    if (!date) throw new Error("date is not valid!");
    if (Number.isNaN(Date.parse(date))) throw new Error("The date parameter is not valid!");
    return new JsonDB(getDbPath(date), true, global.isDebugMode);
};
module.exports.getDbPath = getDbPath;
module.exports.checkFolderExistAndCreateIfNot = checkFolderExistAndCreateIfNot;
module.exports.getDbName = getDbName;
