import * as types from "../types"

const state = {
    areas: []
}

const getters = {
    [types.AREAS]: state => {
        return state.areas
    }
}

const mutations = {
    [types.MUTATE_SET_AREAS]: (state, _areas) => {
        state.areas = _areas
    },
    [types.MUTATE_TOGGLE_AREA_IS_EXPAND]: () => {},
    [types.MUTATE_DELETE_AREA]: (state, areaId) => {
        let _areas = []
        state.areas.forEach(element => {
            if (element.id !== areaId) {
                _areas.push(element)
            }
        })
        state.areas = _areas
    },
    [types.MUTATE_DELETE_NODE]: (state, { areaId, nodeId }) => {
        let _areas = []
        state.areas.forEach(element => {
            if (element.id === areaId) {
                let _nodes = []
                element.nodes.forEach(node => {
                    if (node.id != nodeId) {
                        _nodes.push(node)
                    }
                })
                element.nodes = _nodes
            }
            _areas.push(element)
        })
        state.areas = _areas
    }
}

const actions = {
    [types.SET_AREAS]: ({ commit }, areas) => {
        commit(types.MUTATE_SET_AREAS, areas)
    },
    [types.TOGGLE_AREA_IS_EXPAND]: ({ commit }) => {
        commit(types.MUTATE_TOGGLE_AREA_IS_EXPAND)
    },
    [types.DELETE_AREA]: ({ commit }, areaId) => {
        commit(types.MUTATE_DELETE_AREA, areaId)
    },
    [types.DELETE_NODE]: ({ commit }, payload) => {
        commit(types.MUTATE_DELETE_NODE, payload)
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
