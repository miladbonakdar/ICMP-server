const fs = require('fs');
const endOfLine = require('os').EOL;
module.exports = class CsvConverter {
    constructor(arrayOfObjects, headerObject, pathToSave = __dirname) {
        if (!arrayOfObjects || typeof arrayOfObjects != 'object') throw new Error('invalid converter parameter');
        if (arrayOfObjects.length == 0) throw new Error('array is empty');
        if (!headerObject) headerObject = this.getDefaultHeader(arrayOfObjects[0]);
        this.sortObjectKeys(headerObject);
        arrayOfObjects.forEach(element => {
            this.sortObjectKeys(element);
        });
        this.array = arrayOfObjects;
        this.header = headerObject;
        this.path = pathToSave;
        this.dataString = '';
    }

    convert() {
        this.createHeader();
        this.createBody();
        return this.dataString;
    }

    createHeader() {
        this.dataString = '';
        this.dataString += this.header + endOfLine;
    }

    createBody() {
        this.array.forEach(item => {
            this.dataString += this.csvLineFromObjectValidateByHeader(item);
        });
    }

    csvLineFromObjectValidateByHeader(item) {
        let line = '';
        this.header.split(',').forEach(key => {
            line += (item[key] !== undefined ? item[key].toString() : '') + ',';
        });
        if (line.endsWith(',')) line = line.substring(0, line.length - 1);
        line += endOfLine;
        return line;
    }

    async saveToFileAsync(path = this.path) {
        if (!path.toLowerCase().endsWith('.csv')) path += '.csv';
        return new Promise((resolve, reject) => {
            fs.writeFile(path, this.dataString, 'utf8', function(err) {
                if (err) reject(err);
                else resolve(path);
            });
        });
    }

    async sortObjectKeys(variable) {
        const ordered = {};
        Object.keys(variable)
            .sort()
            .forEach(function(key) {
                ordered[key] = variable[key];
            });
        variable = ordered;
    }

    getDefaultHeader(sample) {
        if (!sample) return '';
        return Object.keys(sample).join();
    }
};
