const mainDb = require("./mainDb");
const logDb = require("./logDb");
const settingDb = require("./settingDb");

module.exports = {
    getDb(dbName) {
        if (dbName.toLowerCase() == "maindb") return mainDb();
        else if (dbName.toLowerCase() == "logdb") return logDb(new Date());
        else if (dbName.toLowerCase() == "settingdb")
            return logDb(new settingDb());
        else throw "db nams is not valid";
    },
    getMainDb() {
        return mainDb();
    },
    getSettingDb() {
        return settingDb();
    },
    getLastLogDb() {
        return logDb(new Date());
    },
    getLogDb(date) {
        return logDb(date);
    }
};
