const fs = require('fs');
const endOfLine = require('os').EOL;
module.exports = class CsvConverter {
    constructor(arrayOfObjects, headerObject, pathToSave = __dirname) {
        if (!arrayOfObjects || typeof arrayOfObjects != 'object')
            throw new Error('invalid converter parameter');
        if (arrayOfObjects.length == 0) throw new Error('array is empty');
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
        this.dataString += this.csvLineFromObject(this.header);
    }

    createBody() {
        this.array.forEach(item => {
            this.dataString += this.csvLineFromObjectValidateByHeader(item);
        });
    }

    csvLineFromObject(item) {
        let line = '';
        Object.keys(item).forEach(key => {
            line += (item[key] ? item[key].toString() : '') + ',';
        });
        if (line.endsWith(',')) line = line.substring(0, line.length - 1);
        line += endOfLine;
        return line;
    }

    csvLineFromObjectValidateByHeader(item) {
        let line = '';
        Object.keys(item).forEach(key => {
            if (this.header[key])
                line += (item[key] ? item[key].toString() : '') + ',';
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
};
