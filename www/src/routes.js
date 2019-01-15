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
        name: routsName.login()
    },
    {
        path: "/dashboard",
        name: routsName.dashboard(),
        component: Dashboard
    },
    {
        path: "/setting",
        name: routsName.setting(),
        component: Setting
    },
    {
        path: "/area",
        name: routsName.area(),
        component: Area,
        children: [
            {path: "", name: routsName.addArea(),component:AddArea},
            {path: ":id", name: routsName.editArea(), component: EditArea}
        ]
    },
    {
        path: "/node",
        component: Node,
        children: [
            {path: "", name: routsName.addNode(),component:AddNode},
            {path: ":id", name: routsName.editNode(), component: EditNode}
        ]
    },
    {
        path: "*",
        redirect: {name: "dashboard"}
    }
];