const path = require("path");
const fs = require("fs");
module.exports = {
    /** TODO: add description
     *  FIXME: unitTest
     */
    getHeader: () => {
        return {
            parent: "Parent path",
            path: "Node path",
            createdOn: "Created od",
            updatedOn: "Updated on",
            nodeName: "Node name",
            hostName: "Ip address",
            areaName: "Area name",
            areaId: "Area Id",
            nodeId: "Node Id",
            nodePath: "Node path",
            isAlive: "Alive"
        };
    },

    getFolderPath: () => {
        const dir = path.join(__dirname, "public", "csvExports");
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, 744);
        }
        return dir;
    },

    /** TODO: add description
     *  FIXME: unitTest
     */
    getFilePath: () => {
        const date = new Date();
        const destination = path.join(
            getFolderPath(),
            `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getDay()}.log.csv`
        );
        return destination;
    }
};
