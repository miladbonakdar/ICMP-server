const { Schema, model } = require("mongoose");
const creationContract = require("./contracts/creation.contract");
const document = require("./contracts/document.contract");
const userRoll = require("./nestedModels/userRollModel");

let userSchema = new Schema(
    {
        name: { type: String, required: true },
        lastname: { type: String, required: true },
        username: { type: String, required: true },
        password: { type: String, required: true },
        email: String,
        roll: userRoll
    }.merge(creationContract, document)
);

module.exports = model("user", userSchema);
