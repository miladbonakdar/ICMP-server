const path = require('path');
const fs = require('fs');

const getFolderPath = () => {
    const dir = path.join(__baseDirname, 'public', 'csvExports');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, 744);
    }
    return dir;
};

module.exports = {
    getFolderPath,
    getFilePath: () => {
        const date = new Date();
        const destination = path.join(getFolderPath(), `${date.getNowFileName()}.log.csv`);
        return destination;
    }
};
