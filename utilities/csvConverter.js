const fs = require("fs");
const endOfLine = require("os").EOL;
const dailyReportCsvTitles = require("./dailyReportCsvStatics");
module.exports = class csvConverter {
    constructor(arrayOfObjects) {
        if (!arrayOfObjects || typeof arrayOfObjects != "object")
            throw "invalid converter parameter";
        this.array = arrayOfObjects;
        this.dataString = "";
    }
    convert() {
        this.createHeader();
        this.createBody();
    }
    createHeader() {
        this.dataString = "";
        this.dataString += this.jsonLineFromObject(dailyReportCsvTitles);
    }
    createBody() {
        this.array.forEach(item => {
            this.dataString += this.jsonLineFromObject(item);
        });
    }
    jsonLineFromObject(item) {
        let line = "";
        Object.keys(item).forEach(key => {
            line += item[key].toString() + ",";
        });
        if (line.endsWith(",")) line = line.substring(0, line.length - 1);
        line += endOfLine;
        return line;
    }
    async saveToFileAsync(path) {
        if (!path.toLowerCase().endsWith(".csv")) path += ".csv";
        return new Promise((resolve, reject) => {
            fs.writeFile(path, this.dataString, "utf8", function(err) {
                if (err) reject(err);
                else resolve(path);
            });
        });
    }
};
