const _ = require("lodash");
const Log = require("./mongoModels/logEvent.model");
module.exports = class LogRepository {
    async getLogEvents(dateString) {
        let baseItem = this.getBaseItemFromDate(dateString);
        baseItem.logEvents = baseItem.logEvents || [];
        return baseItem.logEvents;
    }

    createLogModel(area, node) {
        let newLog = {};
        newLog.path = `${parentPath}/logs[${index}]`;
        newLog.parent = parentPath;
        newLog.areaId = area.id;
        newLog.areaName = area.name;
        newLog.hostName = node.hostName;
        newLog.isAlive = node.alive;
        newLog.nodeId = node.id;
        newLog.nodeName = node.name;
        newLog.nodePath = node.path;
        newLog = new Log(newLog);
        return newLog;
    }

    getLogsFromAreas(areas) {
        let logs = [];
        areas.forEach(area => {
            (area.nodes || []).forEach(node => {
                logs.push(this.createLogModel(area, node));
            });
        });
        return logs;
    }

    async getLastLog() {
        const logs = await Log.find({})
            .sort("-createdOn")
            .limit(1)
            .exec();
        return logs[0] || null;
    }

    async saveAreasLog(areas) {
        let baseItem = new ItemBase(this.get("/"));
        if (!baseItem.logEvents) {
            baseItem.logEvents = [];
            this.add(baseItem);
        }
        let newLogEvent = {};
        newLogEvent.totalAreas = areas.length;
        newLogEvent.path = `/logEvents[${baseItem.logEvents.length}]`;
        const deviceLogs = this.getLogsFromAreas(areas, newLogEvent.path);
        newLogEvent = new LogEvent(newLogEvent);
        newLogEvent.logs = deviceLogs;
        newLogEvent.totalDevices = deviceLogs.length;
        newLogEvent.totalUp = deviceLogs.filter(log => log.isAlive).length;
        newLogEvent.totalDown = newLogEvent.totalDevices - newLogEvent.totalUp;
        this.add(newLogEvent);
    }

    async getLogsForCsvExport(dateString = null) {
        let logBase = dateString ? this.getBaseItemFromDate(dateString) : this.get("/");
        if (!logBase.logEvents) throw new Error("there is no log saved yet");
        return _.spread(_.union)(logBase.logEvents.map(item => item.logs));
    }
};
