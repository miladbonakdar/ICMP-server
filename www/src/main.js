import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import VueRouter from "vue-router";
import Meta from "vue-meta";
import VueMoment from "vue-moment";
import App from "./App.vue";
import {routes} from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Loading from "./components/Loading.vue";
import {store} from "./store/store";
import VueCrud from "./vueCrud";
import CrudlyConfig from "./crudlyConfig";
import Toasted from "vue-toasted";

Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(Meta);
Vue.use(VueMoment);
Vue.use(VueCrud, CrudlyConfig);
Vue.use(Toasted);

Vue.toasted.register(
    "error", 
    (payload) => {
        // if there is no message passed show default message
        if(! payload.message) {
    	    return "Oops.. Something Went Wrong..";
        }
		
        // if there is a message show it with the message
        return "Oops.. " + payload.message;
    }, 
    {
        type : "error",
        duration : 5000,
        theme : "bubble",
        position : "bottom-center"
    }
);
Vue.toasted.register(
    "success", 
    (payload) => {
        // if there is no message passed show default message
        if(! payload.message) {
    	    return "Action done successfully";
        }
		
        // if there is a message show it with the message
        return payload.message;
    }, 
    {
        type : "success",
        duration : 5000,
        theme : "bubble",
        position : "bottom-center"
    }
);
Vue.toasted.register("info", "Oops.. Something Went Wrong..", {
    type : "info",
    duration : 5000,
    theme : "bubble",
    position : "bottom-center"
});

Vue.component("app-loading", Loading);

const router = new VueRouter({
    routes
});

new Vue({
    el: "#app",
    store,
    router,
    render: h => h(App)
});
