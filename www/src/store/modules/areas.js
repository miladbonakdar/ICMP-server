import * as types from "../types";

const state = {
    areas:[]
};

const getters = {
    [types.AREAS]: state => {
        return state.areas;
    }
};

const mutations = {
    [types.MUTATE_SET_AREAS]: (state, _areas) => {
        state.areas = _areas;
    },
    [types.MUTATE_TOGGLE_AREA_IS_EXPAND]: state => {
    }
};

const actions = {
    [types.SET_AREAS]: ({ commit }, areas) => {
        commit(types.MUTATE_SET_AREAS, areas);
    },
    [types.TOGGLE_AREA_IS_EXPAND]: ({ commit }) => {
        commit(types.MUTATE_TOGGLE_AREA_IS_EXPAND);
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};