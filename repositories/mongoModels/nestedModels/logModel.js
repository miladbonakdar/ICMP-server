const creationContract = require("../contracts/creation.contract");
const document = require("../contracts/document.contract");
const ObjectId = require("mongoose").Schema.Types.ObjectId;

module.exports = {
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
