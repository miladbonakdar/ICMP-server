const { model } = require("mongoose");
const logSchema = require("./nestedModels/logSchema");

module.exports = model("log", logSchema);
