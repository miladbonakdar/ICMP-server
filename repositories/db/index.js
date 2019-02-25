const mainDb = require("./mainDb");
const logDb = require("./logDb");
const settingDb = require("./settingDb");

module.exports = {
    /**  FIXME: unitTest
     * @param  string dbName
     * @returns database object
     */
    getDb(dbName) {
        if(!dbName)throw new Error("db nams is empty");
        if (dbName.toLowerCase() == "maindb") return mainDb();
        else if (dbName.toLowerCase() == "logdb") return logDb(new Date());
        else if (dbName.toLowerCase() == "settingdb")
            return settingDb();
        else throw new Error("db nams is not valid");
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
    getLogDb(date = new Date()) {
        return logDb(date);
    }
};
