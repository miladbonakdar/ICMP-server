import Login from "./components/Login.vue";
import Dashboard from "./components/Dashboard.vue";
import Setting from "./components/Setting.vue";
import AddArea from "./components/AddArea.vue";
import EditArea from "./components/EditArea.vue";
import Area from "./components/Area.vue";
import Node from "./components/Node.vue";
import AddNode from "./components/AddNode.vue";
import EditNode from "./components/EditNode.vue";
import routsName from "./routsName";

export const routes = [
    {
        path: "/login",
        component: Login,
        name: routsName.LOGIN
    },
    {
        path: "/dashboard",
        name: routsName.DASHBOARD,
        component: Dashboard
    },
    {
        path: "/setting",
        name: routsName.SETTING,
        component: Setting
    },
    {
        path: "/areas",
        name: routsName.AREA,
        component: Area,
        children: [
            {path: "", name: routsName.ADD_AREA, component:AddArea},
            {path: ":id", name: routsName.EDIT_AREA, component: EditArea}
        ]
    },
    {
        path: "/node/:id",
        name: routsName.NODE,
        component: Node
    },
    {
        path: "*",
        redirect: {name: routsName.DASHBOARD}
    }
];