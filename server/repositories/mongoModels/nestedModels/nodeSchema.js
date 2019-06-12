const { Schema } = require('mongoose');
const creationContract = require('../contracts/creation.contract');
const document = require('../contracts/document.contract');

const schemaBase = {
    name: { type: String, required: true },
    hostName: { type: String, required: true },
    alive: { type: Boolean, default: false },
    number: String,
    deviceType: String,
    deviceModel: String,
    ...creationContract,
    ...document
};

const nodeSchema = new Schema(schemaBase);
nodeSchema.exportHeader = Object.keys(schemaBase).join();
module.exports = nodeSchema;
