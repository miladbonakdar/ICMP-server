const creationContract = require("../contracts/creation.contract");
const document = require("../contracts/document.contract");
module.exports = {
    name: { type: String, required: true },
    hostName: { type: String, required: true },
    alive: { type: Boolean, default: false },
    number: String,
    deviceType: String,
    deviceModel: String
}.merge(creationContract, document);
