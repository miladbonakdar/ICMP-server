const path = require("path");
module.exports = {
    /** TODO: add description
     *
     */
    getHeader: () => ({
        date: "Date",
        nodeName: "Node name",
        ip: "Ip address",
        areaName: "Area name",
        areaId: "Area id",
        nodeId: "Node id",
        nodePath: "Node path",
        isAlive: "Status"
    }),
    /** TODO: add description
     *
     */
    getFilePath: () => {
        const date = new Date();
        path.join(
            __dirname,
            "csvExports",
            `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getDay()}`
        );
    }
};
