const path = require("path");
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

    /** TODO: add description
     *  FIXME: unitTest
     */
    getFilePath: () => {
        const date = new Date();
        path.join(
            __dirname,
            "public",
            "csvExports",
            `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getDay()}`
        );
    }
};
