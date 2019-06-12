const { model } = require('mongoose');
const nodeSchema = require('./nestedModels/nodeSchema');
const nodeModel = model('node', nodeSchema);
nodeModel.exportHeader = nodeSchema.exportHeader;
module.exports = nodeModel;
