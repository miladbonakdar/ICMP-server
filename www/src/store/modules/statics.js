const state = {
    statics: {
        deviceTypes: ["type 1", "type 2"],
        deviceModels: ["model 1", "model 2"]
    }
};

const getters = {
    Statics: state => state.statics,
    deviceModels: state => state.statics.deviceModels,
    deviceTypes: state => state.statics.deviceTypes
};

export default {
    state,
    getters
};
