const path = require("path");
module.exports = {
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
    getFilePath: () => {
        const date = new Date();
        path.join(
            __dirname,
            "csvExports",
            `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getDay()}`
        );
    }
};
