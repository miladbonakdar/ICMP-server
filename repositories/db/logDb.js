const fs = require("fs");
const path = require("path");
const JsonDB = require("node-json-db");

const getDbName = async date => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getDay()}.log.json`;
};

const checkFolderExistAndCreateIfNot = async date => {
    let dir = path.join(
        __baseDirname,
        "database",
        "logs",
        `${date.getFullYear()}-${date.getMonth()}`
    );
    if (!(await fs.existsSync(dir))) {
        await fs.mkdirSync(dir, 744);
    }
    return dir;
};

const getDbPath = async date => {
    return path.join(
        await checkFolderExistAndCreateIfNot(date),
        getDbName(date)
    );
};

module.exports = async date => {
    return new JsonDB(await getDbPath(date), true, global.isDebugMode);
};
