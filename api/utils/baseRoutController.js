/** TODO: add description
 *  FIXME: unitTest
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
