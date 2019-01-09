import Login from "./components/Login.vue";
import Setting from "./components/Setting.vue";
import Areas from "./components/Areas.vue";
import Node from "./components/Node.vue";

export const routes = [
    {
        path: "/login",
        component: Login
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