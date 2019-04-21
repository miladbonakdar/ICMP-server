const { Schema, model } = require('mongoose');
const creationContract = require('./contracts/creation.contract');
const fakeId = require('./contracts/fakeId.contract');
const nodeSchema = require('./nestedModels/nodeSchema');

let areaSchema = new Schema({
    name: { type: String, required: true },
    totalDown: { type: Number, default: 0 },
    totalUp: { type: Number, default: 0 },
    nodes: [nodeSchema],
    ...creationContract
});

fakeId(areaSchema);

module.exports = model('area', areaSchema);
