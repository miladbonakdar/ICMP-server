const pingHost = require("./pingHost");
const areaRepository = new (require("../repositories/areaRepository"))();
const logRepository = new (require("../repositories/logRepository"))();

const pingNode = async node => {
    node.alive = await pingHost(node.hostName);
};

const pingNodes = async nodes => {
    for (const item of nodes) {
        await pingNode(item);
    }
};

const pingAreas = async areas => {
    for (const item of areas) {
        await pingNodes(item.nodes);
        item.totalUp = item.nodes.filter(node => node.alive).length;
        item.totalDown = item.nodes.length - item.totalUp;
    }
};

const pingHosts = async () => {
    let areas = await areaRepository.getAreas();
    await pingAreas(areas);
    areaRepository.saveAreas(areas);
    logRepository.saveAreasLog(areas);
    console.log("ping nodes finished");
};

module.exports = pingHosts;
