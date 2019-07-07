const pingHost = require('./pingHost');
const AreaRepository = require('../repositories/areaRepository');
const LogRepository = require('../repositories/logRepository');

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
    logRepository = new LogRepository();
    areaRepository = new AreaRepository();
    console.log('ping nodes started');
    let areas = await areaRepository.getAll();
    await pingAreas(areas);
    areaRepository.updateAreas(areas);
    logRepository.saveAreasLog(areas);
    console.log('ping nodes finished');
};

module.exports = pingHosts;
