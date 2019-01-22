import * as types from "../types";

const state = {
    areaExpandState: []
};

const getters = {
    [types.AREA_EXPAND_STATE]: state => {
        return state.areaExpandState;
    }
};

const mutations = {
    [types.MUTATE_INIT_AREA_EXPAND_STATE]: (state, areaCount) => {
        for (let i = 0; i < areaCount; i++) {
            state.areaExpandState[i] = false;
        }
    },
    [types.MUTATE_TOGGLE_AREA_EXPAND_STATE]: (state, payload) => {
        state.areaExpandState[payload] = !state.areaExpandState[payload];
    }
};

const actions = {
    [types.INIT_AREA_EXPAND_STATE]: ({ commit }, payload) => {
        commit(types.MUTATE_INIT_AREA_EXPAND_STATE, payload);
    },
    [types.TOGGLE_AREA_EXPAND_STATE]: ({ commit }, payload) => {
        commit(types.MUTATE_TOGGLE_AREA_EXPAND_STATE, payload);
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};