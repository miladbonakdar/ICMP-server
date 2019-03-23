export default {
  root: "http://localhost:3000/api/v1",
  defaultActions: [
    { type: "get", name: "get", url: "/:id" },
    { type: "get", name: "getAll" },
    { type: "put" },
    { type: "delete", url: "/:id" },
    { type: "post" },
    { type: "get", name: "getByIndex", url: "/getByIndex/:index" }
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
      actions: []
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
    }
  ]
};
