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
    getHeader: () => {
        return {
            parent: 'Parent path',
            path: 'Node path',
            createdOn: 'Created od',
            updatedOn: 'Updated on',
            nodeName: 'Node name',
            hostName: 'Ip address',
            areaName: 'Area name',
            areaId: 'Area Id',
            nodeId: 'Node Id',
            nodePath: 'Node path',
            isAlive: 'Alive'
        };
    },

    getFolderPath,

    getFilePath: () => {
        const date = new Date();
        const destination = path.join(
            getFolderPath(),
            `${date.getNowFileName()}.log.csv`
        );
        return destination;
    }
};
