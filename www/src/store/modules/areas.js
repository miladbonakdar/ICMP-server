import * as types from "../types";
import areas from "../../Areas.json";

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
    }
};

const actions = {
    [types.SET_AREAS]: ({ commit }, areas) => {
        commit(types.MUTATE_SET_AREAS, areas);
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};