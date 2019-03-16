const fs = require("fs");
const endOfLine = require("os").EOL;
module.exports = class CsvConverter {
    /** TODO: add description
     *
     */
    constructor(arrayOfObjects, headerObject, pathToSave = __dirname) {
        if (!arrayOfObjects || typeof arrayOfObjects != "object")
            throw new Error("invalid converter parameter");
        if (arrayOfObjects.length == 0) throw new Error("array is empty");
        if (
            Object.keys(headerObject).length !=
            Object.keys(arrayOfObjects[0]).length
        )
            throw new Error("header and the body are not in the same size");
        this.array = arrayOfObjects;
        this.header = headerObject;
        this.path = pathToSave;
        this.dataString = "";
    }

    /** TODO: add description
     *
     */
    convert() {
        this.createHeader();
        this.createBody();
        return this.dataString;
    }

    /** TODO: add description
     *
     */
    createHeader() {
        this.dataString = "";
        this.dataString += this.jsonLineFromObject(this.header);
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
    async saveToFileAsync(path = this.path) {
        if (!path.toLowerCase().endsWith(".csv")) path += ".csv";
        return new Promise((resolve, reject) => {
            fs.writeFile(path, this.dataString, "utf8", function(err) {
                if (err) reject(err);
                else resolve(path);
            });
        });
    }
};
