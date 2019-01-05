const fs = require("fs");
const endOfLine = require("os").EOL;
const dailyReportCsvStatics = require("./dailyReportCsvStatics");
module.exports = class csvConverter {
    /** TODO: add description
     *
     */
    constructor(arrayOfObjects) {
        if (!arrayOfObjects || typeof arrayOfObjects != "object")
            throw "invalid converter parameter";
        this.array = arrayOfObjects;
        this.dataString = "";
    }
    /** TODO: add description
     *
     */
    convert() {
        this.createHeader();
        this.createBody();
    }
    /** TODO: add description
     *
     */
    createHeader() {
        this.dataString = "";
        this.dataString += this.jsonLineFromObject(dailyReportCsvStatics);
    }
    /** TODO: add description
     *
     */
    createBody() {
        this.array.forEach(item => {
            this.dataString += this.jsonLineFromObject(item);
        });
    }
    /** TODO: add description
     *
     */
    jsonLineFromObject(item) {
        let line = "";
        Object.keys(item).forEach(key => {
            line += item[key].toString() + ",";
        });
        if (line.endsWith(",")) line = line.substring(0, line.length - 1);
        line += endOfLine;
        return line;
    }
    /** TODO: add description
     *
     */
    async saveToFileAsync(path = dailyReportCsvStatics.getFilePath()) {
        if (!path.toLowerCase().endsWith(".csv")) path += ".csv";
        return new Promise((resolve, reject) => {
            fs.writeFile(path, this.dataString, "utf8", function(err) {
                if (err) reject(err);
                else resolve(path);
            });
        });
    }
};
