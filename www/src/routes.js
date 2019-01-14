import Login from "./components/Login.vue";
import Dashboard from "./components/Dashboard.vue";
import Setting from "./components/Setting.vue";
import Areas from "./components/Areas.vue";
import Node from "./components/Nodes.vue";

export const routes = [
    {
        path: "/login",
        component: Login
    },
    {
        path: "/dashboard",
        component: Dashboard
    },
    {
        path: "/setting",
        component: Setting
    },
    {
        path: "/area",
        component: Areas
    },
    {
        path: "/node",
        component: Node
    }
];