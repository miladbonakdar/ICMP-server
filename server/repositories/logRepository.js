const _ = require('lodash');
const Log = require('./mongoModels/log.model');
const LogEvent = require('./mongoModels/logEvent.model');
const Page = require('../models/pageModel');
module.exports = class LogRepository {
    getDateFilterFromBody(query) {
        if (!query) return null;
        const mongoQuery = {};
        if (!query.from && !query.from) return null;
        mongoQuery.createdOn = {};
        if (query.from) mongoQuery.createdOn.$gte = query.from;
        if (query.to) mongoQuery.createdOn.$lt = query.to;
        return mongoQuery;
    }

    async getLogEvents(requestBody) {
        requestBody.query = this.getDateFilterFromBody(requestBody.query);
        const page = new Page(requestBody);
        const logEvents = await LogEvent.find(page.query)
            .sort('-createdOn')
            .skip(page.pageNumber * page.pageSize)
            .limit(page.pageSize)
            .exec();
        return logEvents;
    }

    async getLogsCount(requestBody) {
        const page = new Page(requestBody);
        return await LogEvent.count(page.query);
    }

    createLogModel(area, node) {
        let newLog = {};
        newLog.areaId = area.id;
        newLog.areaName = area.name;
        newLog.hostName = node.hostName;
        newLog.isAlive = node.alive;
        newLog.nodeId = node.id;
        newLog.nodeName = node.name;
        newLog.number = node.number;
        newLog.deviceType = node.deviceType;
        newLog.deviceModel = node.deviceModel;
        return new Log(newLog);
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
        const logs = await LogEvent.find({})
            .sort('-createdOn')
            .limit(1)
            .exec();
        return logs[0] || null;
    }

    async saveAreasLog(areas, isFromCron = true) {
        let newLogEvent = new LogEvent({});
        const deviceLogs = this.getLogsFromAreas(areas);
        newLogEvent.logs = deviceLogs;
        newLogEvent.totalAreas = areas.length;
        newLogEvent.totalDevices = deviceLogs.length;
        newLogEvent.totalUp = deviceLogs.filter(log => log.isAlive).length;
        newLogEvent.totalDown = newLogEvent.totalDevices - newLogEvent.totalUp;
        newLogEvent.isFromCron = isFromCron;
        return await newLogEvent.save();
    }

    async getLogsForCsvExport(requestBody) {
        const logs = await this.getLogEvents(requestBody);
        return _.spread(_.union)(logs.map(item => item.logs));
    }
};
