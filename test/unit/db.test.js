global.__baseDirname = __dirname;
const db = require("../../repositories/db/index");
const check = require("../checkFunctions").check;

beforeAll(() => {
    require("../../utils/classExtentions")();
});

test("getDb should throw excetion with invalid dbname", () => {
    try {
        db.getDb();
    } catch (e) {
        expect(e).toBeDefined();
        expect(e.message).toBe("db nams is empty");
    }
    try {
        db.getDb("funDb");
    } catch (e) {
        expect(e).toBeDefined();
        expect(e.message).toBe("db nams is not valid");
    }
});

test(
    "functions should not have exception on valid input",
    check(() => {
        db.getDb("maindb");
        db.getDb("logdb");
        db.getDb("settingdb");
        db.getLogDb();
        db.getMainDb();
        db.getSettingDb();
    })
);
