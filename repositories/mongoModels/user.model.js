const { Schema, model } = require("mongoose");
const creationContract = require("./contracts/creation.contract");
const userRoll = require("./nestedModels/userRollModel");
const fakeId = require("./contracts/fakeId.contract");

let userSchema = new Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: String,
    roll: userRoll,
    ...creationContract
});

fakeId(userSchema);

module.exports = model("user", userSchema);
