const { Schema, model } = require('mongoose');
const creationContract = require('./contracts/creation.contract');
const userRoll = require('./nestedModels/userRollModel');
const fakeId = require('./contracts/fakeId.contract');
const bcrypt = require('bcryptjs');

let userSchema = new Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, unique: true },
    roll: userRoll,
    ...creationContract
});

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

fakeId(userSchema);

module.exports = model('user', userSchema);
