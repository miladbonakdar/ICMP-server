export default {
    root: "/api/v1",
    defaultActions: [
        { type: "get", name: "getAll" },
        { type: "put" },
        { type: "post" },
        { type: "get", name: "getByIndex", url: "/getByIndex/:index" },
        { type: "get", name: "get", url: "/:id" },
        { type: "delete", url: "/:id" }
    ],
    controllers: [
        {
            name: "area",
            loadDefaults: true,
            actions: []
        },
        {
            name: "node",
            loadDefaults: true,
            actions: [{ type: "get", name: "export", url: "/export/:type" }]
        },
        {
            name: "setting",
            loadDefaults: false,
            actions: [{ type: "get", name: "get" }, { type: "put" }]
        },
        {
            name: "public",
            loadDefaults: false,
            actions: [
                { type: "get", name: "getTimes", url: "/getExecutationTimes" },
                { type: "get", name: "info", url: "/getSiteInfo" },
                { type: "post", name: "ping", url: "/pingNodes" }
            ]
        },
        {
            name: "user",
            actions: [
                { type: "post", name: "login", url: "/login" },
                { type: "get", name: "getUserTypes", url: "/getUserTypes" }
            ]
        },
        {
            name: "log",
            loadDefaults: false,
            actions: [
                { type: "post", name: "getPage", url: "/" },
                { type: "post", name: "getCsv", url: "/getCsvLog" },
                { type: "post", name: "count", url: "/count" }
            ]
        }
    ]
};
