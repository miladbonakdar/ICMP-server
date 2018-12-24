const fs = require("fs");
const path = require("path");
const JsonDB = require("node-json-db");

getDbName = async date => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getDay()}.log.json`;
};

checkFolderExistAndCreateIfNot = async date => {
    let dir = path.join(
        __dirname,
        "logs",
        `${date.getFullYear()}-${date.getMonth()}`
    );
    if (!(await fs.existsSync(dir))) {
        await fs.mkdirSync(dir, 0744);
    }
    return dir;
};

getDbPath = async date => {
    return path.join(await checkFolderExistAndCreateIfNot(date), getDbName(date));
};

module.exports = async date => {
    return new JsonDB(await getDbPath(date), true, global.isDebugMode);
};
