const CsvConverter = require("../../utils/csvConverter");
const csvData = require("../data/csvConverter.data");
const endOfLine = require("os").EOL;
const path = require("path");
const fs = require("fs");
const checkFunctions = require("../checkFunctions");
const check = checkFunctions.check;
const checkForException = checkFunctions.checkForException;

test(
    "throw invalid converter parameter",
    checkForException(() => {
        const converter = new CsvConverter();
    }, "invalid converter parameter")
);

test(
    "throw array is empty",
    checkForException(() => {
        const converter = new CsvConverter(
            csvData.emptyCsvObjectArray,
            csvData.validCsvHeaderObject
        );
    }, "array is empty")
);

test(
    "throw header and the body are not in the same size",
    checkForException(() => {
        const converter = new CsvConverter(
            csvData.validCsvObjectArray,
            csvData.invalidCsvHeaderObject
        );
    }, "header and the body are not in the same size")
);

test(
    "valid object creation",
    check(() => {
        const converter = new CsvConverter(
            csvData.validCsvObjectArray,
            csvData.validCsvHeaderObject
        );
        expect(converter.array).toEqual(csvData.validCsvObjectArray);
        expect(converter.header).toEqual(csvData.validCsvHeaderObject);
        expect(converter.path).toBeDefined();
        expect(converter.dataString).toBe("");
    })
);

test(
    "jsonLineFromObject should return a line of csv",
    check(() => {
        const converter = new CsvConverter(
            csvData.validCsvObjectArray,
            csvData.validCsvHeaderObject
        );
        expect(
            converter.jsonLineFromObject({
                name: "milad",
                lastname: "bonakdar"
            })
        ).toBe("milad,bonakdar" + endOfLine);
        expect(
            converter.jsonLineFromObject({
                name: "milad",
                lastname: "bonakdar",
                age: 24,
                height: 185
            })
        ).toBe("milad,bonakdar,24,185" + endOfLine);
    })
);

test(
    "create header and create body should return valid string",
    check(() => {
        const converter = new CsvConverter(
            csvData.validCsvObjectArray,
            csvData.validCsvHeaderObject
        );
        converter.createHeader();
        expect(converter.dataString).toBe("Name,Last Name" + endOfLine);
        expect(converter.array.length).toBe(4);
        converter.createBody();
        expect(converter.dataString).toBe(
            "Name,Last Name" +
                endOfLine +
                "milad,bonakdar" +
                endOfLine +
                "niosha,shabani" +
                endOfLine +
                "marjan,ahmadi" +
                endOfLine +
                "morty,rad" +
                endOfLine
        );
    })
);

test("create header and create body should return valid string", async () => {
    const converter = new CsvConverter(
        csvData.validCsvObjectArray,
        csvData.validCsvHeaderObject
    );
    converter.convert();
    await converter.saveToFileAsync(path.join(__dirname, "export.cache.csv"));
    expect(fs.existsSync(path.join(__dirname, "export.cache.csv"))).toBe(true);
    fs.unlinkSync(path.join(__dirname, "export.cache.csv"));
});
