const { Schema, model } = require("mongoose");
const creationContract = require("./contracts/creation.contract");
const document = require("./contracts/document.contract");
const logModel = require("./nestedModels/logModel");

let logEventSchema = new Schema(
    {
        isFromCron: { type: Boolean, default: true },
        name: { type: String, required: true },
        totalDown: { type: Number, default: 0 },
        totalUp: { type: Number, default: 0 },
        totalDevices: { type: Number, default: 0 },
        totalAreas: { type: Number, default: 0 },
        logs: [logModel]
    }.merge(creationContract, document)
);

module.exports = model("logEvent", logEventSchema);
