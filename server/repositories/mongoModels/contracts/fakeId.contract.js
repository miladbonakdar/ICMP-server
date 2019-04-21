//change id virtual field that present the _id 
module.exports = schema => {
    schema.virtual('id').get(function() {
        return this._id.toHexString();
    });

    schema.set('toJSON', {
        virtuals: true
    });
};
