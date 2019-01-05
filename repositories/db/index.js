const mainDb = require("./mainDb");
const logDb = require("./logDb");
const settingDb = require("./settingDb");

module.exports = {
    /**
     * @param  string dbName
     * @returns database object
     */
    getDb(dbName) {
        if (dbName.toLowerCase() == "maindb") return mainDb();
        else if (dbName.toLowerCase() == "logdb") return logDb(new Date());
        else if (dbName.toLowerCase() == "settingdb")
            return logDb(new settingDb());
        else throw "db nams is not valid";
    },

    /**
     * @returns {db object} main database object
     */
    getMainDb() {
        return mainDb();
    },

    /** TODO: add description
     *
     */
    getSettingDb() {
        return settingDb();
    },

    /** TODO: add description
     *
     */
    getLastLogDb() {
        return logDb(new Date());
    },

    /** TODO: add description
     *
     */
    getLogDb(date) {
        return logDb(date);
    }
};
