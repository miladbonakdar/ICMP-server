const fs = require('fs');
const path = require('path');
const JsonDB = require('node-json-db');

function getDbName(date){
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getDay()}.log.json`;
}

function checkFolderExistAndCreateIfNot(date){
    let dir = path.join(__dirname,'logs',`${date.getFullYear()}-${date.getMonth()}`);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, 0744);
    }
    return dir;
}

function getDbPath(date){
    return path.join(checkFolderExistAndCreateIfNot(date),getDbName(date));
}

module.exports = date => {
    return new JsonDB(getDbPath(), true, global.isDebugMode);
}
