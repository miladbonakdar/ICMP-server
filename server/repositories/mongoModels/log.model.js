const { model } = require('mongoose');
const logSchema = require('./nestedModels/logSchema');
const logModel = model('log', logSchema);
logModel.exportHeader = logSchema.exportHeader;
module.exports = logModel;
