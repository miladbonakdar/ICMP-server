global.__baseDirname = __dirname;
const db = require("../../repositories/db/logDb");
const checkFunctions = require("../checkFunctions");
const check = checkFunctions.check;
const checkForException = checkFunctions.checkForException;

beforeAll(() => {
    require("../../utils/classExtentions")();
});

test(
    "check for valid dbname from get db name",
    check(() => {
        const dbName = db.getDbName(new Date(1547303262452)); //Sat Jan 12 2019 17:57:42 GMT+0330
        expect(dbName).toBe("2019-1-12 Saturday.log.json");
    })
);

test(
    "check checkFolderExistAndCreateIfNot and getDbPath",
    check(() => {
        const folderPath = db.checkFolderExistAndCreateIfNot(new Date(1547303262452)); //Sat Jan 12 2019 17:57:42 GMT+0330
        expect(folderPath).toContain("2019-1");
        const dbPath = db.getDbPath(new Date(1547303262452));
        expect(dbPath).toContain("2019-1-12 Saturday.log.json");
    })
);

test(
    "check checkFolderExistAndCreateIfNot and getDbPath",
    checkForException(() => {
        db();
    }, "date is not valid")
);
