export default {
    root: "http://localhost:3000/api/v1",
    defaultActions: [
        { type: "get", name: "getAll" },
        { type: "put" },
        { type: "post" },
        { type: "get", name: "getByIndex", url: "/getByIndex/:index" }
    ],
    controllers: [
        {
            name: "area",
            loadDefaults: true,
            actions: [{ type: "get", name: "get", url: "/:id" }, { type: "delete", url: "/:id" }]
        },
        {
            name: "node",
            loadDefaults: true,
            actions: [
                { type: "get", name: "export", url: "/export/:type" },
                { type: "get", name: "get", url: "/:areaId/:id" },
                { type: "delete", url: "/:areaId/:id" }
            ]
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
            name: "log",
            loadDefaults: false,
            actions: [{ type: "get", name: "getAll", url: "/now" }, { type: "get", name: "get", url: "/:date" }]
        }
    ]
};
