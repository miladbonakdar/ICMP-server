const ObjectId = require("mongoose").Schema.Types.ObjectId;
const objectId = require("mongoose").Types.ObjectId;

module.exports = {
    id: { type: ObjectId, default: objectId(), required: true }
};
