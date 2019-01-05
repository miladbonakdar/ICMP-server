/** TODO: add description
 *
 */
module.exports = (
    controllerName,
    actionName = undefined,
    parameter = undefined
) => {
    const rout = `/api/v1/${controllerName}${
        actionName ? "/" + actionName : ""
    }`;
    return parameter ? `${rout}/:${parameter}` : rout;
};
