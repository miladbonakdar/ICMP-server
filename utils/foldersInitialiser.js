const path = require("path");
const fs = require("fs");

const createDatabaseFolder = () => {
    let dir = path.join(__baseDirname, "database");
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, 744);
    }
    dir = path.join(__baseDirname, "database", "logs");
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, 744);
    }
};

const createExportFolder = () => {
    let dir = path.join(__baseDirname, "public");
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, 744);
    }
    dir = path.join(__baseDirname, "public", "csvExports");
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, 744);
    }
};

createDatabaseFolder();
createExportFolder();
