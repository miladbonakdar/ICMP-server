import * as types from "../types";
import _ from "lodash";

const state = {
    logs:[]
};

const getters = {
    [types.LOGS]: state => {
        return state.logs;
    }
};

const mutations = {
    [types.MUTATE_SET_LOGS]: (state, _logs) => {
        state.logs = _logs;
    }
};

const actions = {
    [types.SET_LOGS]: ({ commit }, logs) => {
        commit(types.MUTATE_SET_LOGS, logs);
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};