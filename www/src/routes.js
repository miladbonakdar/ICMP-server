import Login from "./views/Login.vue";
import Dashboard from "./views/Dashboard.vue";
import Setting from "./views/Setting.vue";
import Area from "./views/Area.vue";
import Node from "./views/Node.vue";
import Log from "./views/Log.vue";
import UserList from "./views/UserList.vue";
import ModifyUser from "./views/ModifyUser.vue";
import User from "./views/User.vue";

import routesName from "./routesName";

export const routes = [
    {
        path: "/login",
        component: Login,
        name: routesName.LOGIN
    },
    {
        path: "/dashboard",
        name: routesName.DASHBOARD,
        component: Dashboard
    },
    {
        path: "/setting",
        name: routesName.SETTING,
        component: Setting
    },
    {
        path: "/log",
        name: routesName.LOG,
        component: Log
    },
    {
        path: "/area/:id",
        name: routesName.AREA,
        component: Area
    },
    {
        path: "/node/:id",
        name: routesName.NODE,
        component: Node
    },
    {
        path: "/users",
        name: routesName.USER,
        component: User,
        children: [
            {
                name: routesName.MODIFY_USER,
                path: "modify/:id",
                component: ModifyUser
            },
            {
                name: routesName.USER_LIST,
                path: "list",
                component: UserList
            }
        ]
    },
    {
        path: "*",
        redirect: { name: routesName.LOGIN }
    }
];
