const { Schema, model } = require("mongoose");
const creationContract = require("./contracts/creation.contract");
const fakeId = require("./contracts/fakeId.contract");

let settingSchema = new Schema({
    isLoginEnabled: { type: Boolean, default: false },
    isCsvExportEnabled: { type: Boolean, default: false },
    exportCsvFileAtHour: { type: Number, default: 23 },
    exportCsvFileAtMinute: { type: Number, default: 50 },
    pingHostsEvery: { type: Number, default: 30 },
    ...creationContract
});

fakeId(settingSchema);

module.exports = model("setting", settingSchema);
