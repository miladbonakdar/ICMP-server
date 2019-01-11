const mainDb = require("./mainDb");
const logDb = require("./logDb");
const settingDb = require("./settingDb");

module.exports = {
    /**  FIXME: unitTest
     * @param  string dbName
     * @returns database object
     */
    getDb(dbName) {
        if (dbName.toLowerCase() == "maindb") return mainDb();
        else if (dbName.toLowerCase() == "logdb") return logDb(new Date());
        else if (dbName.toLowerCase() == "settingdb")
            return logDb(new settingDb());
        else throw new Error("db nams is not valid");
    },

    /**  FIXME: unitTest
     * @returns {db object} main database object
     */
    getMainDb() {
        return mainDb();
    },

    /** TODO: add description
     *  FIXME: unitTest
     */
    getSettingDb() {
        return settingDb();
    },

    /** TODO: add description
     *  FIXME: unitTest
     */
    getLastLogDb() {
        return logDb(new Date());
    },

    /** TODO: add description
     *  FIXME: unitTest
     */
    getLogDb(date) {
        return logDb(date);
    }
};
