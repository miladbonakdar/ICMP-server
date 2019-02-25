const fs = require("fs");
const path = require("path");
const JsonDB = require("node-json-db");

/** TODO: add description
 *  
 */
const getDbName = date => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getDay()}.log.json`;
};

/** TODO: add description
 *  
 */
const checkFolderExistAndCreateIfNot = date => {
    let dir = path.join(
        __baseDirname,
        "database",
        "logs",
        `${date.getFullYear()}-${date.getMonth()}`
    );
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
    if(!date) throw new Error("date is not valid");
    return new JsonDB(getDbPath(date), true, global.isDebugMode);
};
module.exports.getDbPath = getDbPath;
module.exports.checkFolderExistAndCreateIfNot = checkFolderExistAndCreateIfNot;
module.exports.getDbName = getDbName;
