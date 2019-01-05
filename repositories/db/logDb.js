const fs = require("fs");
const path = require("path");
const JsonDB = require("node-json-db");

/** TODO: add description
 *
 */
const getDbName = async date => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getDay()}.log.json`;
};

/** TODO: add description
 *
 */
const checkFolderExistAndCreateIfNot = async date => {
    let dir = path.join(
        __baseDirname,
        "database",
        "logs",
        `${date.getFullYear()}-${date.getMonth()}.cache.json`
    );
    if (!(await fs.existsSync(dir))) {
        await fs.mkdirSync(dir, 744);
    }
    return dir;
};

/** TODO: add description
 *
 */
const getDbPath = async date => {
    return path.join(
        await checkFolderExistAndCreateIfNot(date),
        getDbName(date)
    );
};

/** TODO: add description
 *
 */
module.exports = async date => {
    return new JsonDB(await getDbPath(date), true, global.isDebugMode);
};
