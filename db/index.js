const mainDb = require("./mainDb");
const logDb = require("./logDb");

module.exports = {
    getDb: dbName => {
        if (dbName == "main" || dbName.toLowerCase() == "maindb")
            return mainDb();
        else if (dbName == "log" || dbName.toLowerCase() == "logdb")
            return logDb(new Date());
        else throw "db nams is not valid";
    },
    getMainDb: () => {
        return mainDb();
    },
    getLastLogDb: () => {
        return logDb(new Date());
    },
    getLogDb: date => {
        return logDb(date);
    }
};
