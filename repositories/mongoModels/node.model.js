const { model } = require("mongoose");
const nodeSchema = require("./nestedModels/nodeSchema");

module.exports = model("node", nodeSchema);
