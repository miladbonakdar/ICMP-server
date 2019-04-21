const { Schema } = require('mongoose');
const creationContract = require('../contracts/creation.contract');
const document = require('../contracts/document.contract');

let nodeSchema = new Schema({
    name: { type: String, required: true },
    hostName: { type: String, required: true },
    alive: { type: Boolean, default: false },
    number: String,
    deviceType: String,
    deviceModel: String,
    ...creationContract,
    ...document
});

module.exports = nodeSchema;
