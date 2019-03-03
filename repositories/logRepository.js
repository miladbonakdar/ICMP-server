const database = require("./db");
const Repository = require("./repository");
const _ = require("lodash");
const LogEvent = require("../models/logEventModel");
const Log = require("../models/logModel");
const ItemBase = require("../models/itemBase");
module.exports = class LogRepository extends Repository {
    /** TODO: add description
     *
     */
    constructor(db = database.getLogDb()) {
        super(db);
    }

    /** TODO: add description
     *
     */
    createLogModel(area, node, parentPath, index) {
        let newLog = {};
        newLog.path = `${parentPath}/logs[${index}]`;
        newLog.parent = parentPath;
        newLog.areaId = area.id;
        newLog.areaName = area.name;
        newLog.ip = node.ip;
        newLog.isAlive = node.alive;
        newLog.nodeId = node.id;
        newLog.nodeName = node.name;
        newLog.nodePath = node.path;
        newLog = new Log(newLog);
        return newLog;
    }

    /** TODO: add description
     *
     */
    getLogsFromAreas(areas, parentPath) {
        let logs = [];
        let index = 0;
        areas.forEach(area => {
            area.nodes.forEach(node => {
                logs.push(this.createLogModel(area, node, parentPath, index));
                index++;
            });
        });
        return logs;
    }
    
    /** TODO: add description
     *
     */
    getLastLog() {
        
    }

    /** TODO: add description
     *
     */
    saveAreasLog(areas) {
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

    /** TODO: add description
     *
     */
    getLogsForCsvExport() {
        let logBase = this.get("/");
        if (!logBase.logEvents) throw new Error("there is no log saved yet");
        return _.spread(_.union)(logBase.logEvents.map(item => item.logs));
    }
};
