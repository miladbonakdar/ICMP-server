module.exports = (controllerName, actionName = undefined) => {
    return `/api/v1/${controllerName}${actionName?'/'+actionName:''}`;
};
