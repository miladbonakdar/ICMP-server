module.exports = (controllerName, actionName = undefined, hasId = false) => {
    const rout = `/api/v1/${controllerName}${
        actionName ? "/" + actionName : ""
    }`;
    return hasId ? `${rout}/:id` : rout;
};
