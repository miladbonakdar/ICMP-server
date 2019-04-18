const { Schema, model } = require("mongoose");
const creationContract = require("./contracts/creation.contract");
const document = require("./contracts/document.contract");
const nodeModel = require("./nestedModels/nodeModel");

let areaSchema = new Schema(
    {
        name: { type: String, required: true },
        totalDown: { type: Number, default: 0 },
        totalUp: { type: Number, default: 0 },
        nodes: [nodeModel]
    }.merge(creationContract, document)
);

module.exports = model("area", areaSchema);
