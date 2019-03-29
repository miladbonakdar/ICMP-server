import crudly from "crudly";
export default {
    install: function(Vue, config, name = "$gate") {
        Object.defineProperty(Vue.prototype, name, { value: new crudly(config) });
    }
};
