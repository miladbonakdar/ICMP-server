const creationContract = require('../contracts/creation.contract');
const document = require('../contracts/document.contract');
const { Schema } = require('mongoose');
const ObjectId = require('mongoose').Schema.Types.ObjectId;

const schemaBase = {
    areaId: ObjectId,
    nodeId: ObjectId,
    isAlive: { type: Boolean, default: false },
    nodeName: String,
    hostName: String,
    areaName: String,
    number: String,
    deviceType: String,
    deviceModel: String,
    ...creationContract,
    ...document
};

const logEchema = new Schema(schemaBase);
logEchema.exportHeader = Object.keys(schemaBase).join();
module.exports = logEchema;
