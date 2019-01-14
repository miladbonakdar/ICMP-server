import Login from "./components/Login.vue";
import Dashboard from "./components/Dashboard.vue";
import Setting from "./components/Setting.vue";
import AddArea from "./components/AddArea.vue";
import EditArea from "./components/EditArea.vue";
import Area from "./components/Area.vue";
import Node from "./components/Nodes.vue";

export const routes = [
    {
        path: "/login",
        component: Login
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard
    },
    {
        path: "/setting",
        component: Setting
    },
    {
        path: "/area",
        component: Area,
        children: [
            {path: "/" ,component:AddArea},
            {path: ":id", component: EditArea}
        ]
    },
    {
        path: "/node",
        component: Node
    },
    {
        path: "*",
        redirect: {name: "dashboard"}
    }
];