const { Schema, model } = require('mongoose');
const creationContract = require('./contracts/creation.contract');
const logModel = require('./nestedModels/logSchema');
const fakeId = require('./contracts/fakeId.contract');

let logEventSchema = new Schema({
    isFromCron: { type: Boolean, default: true },
    totalDown: { type: Number, default: 0 },
    totalUp: { type: Number, default: 0 },
    totalDevices: { type: Number, default: 0 },
    totalAreas: { type: Number, default: 0 },
    logs: [logModel],
    ...creationContract
});

fakeId(logEventSchema);

module.exports = model('logEvent', logEventSchema);
