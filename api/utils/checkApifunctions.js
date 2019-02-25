/** TODO: add description
 *  FIXME: unitTest
 */
const checkAsync = fn =>
    function asyncUtilWrap(...args) {
        const fnReturn = fn(...args);
        const next = args[args.length - 1];
        return Promise.resolve(fnReturn).catch(next);
    };

/** TODO: add description
 *  FIXME: unitTest
 */
const check = fn =>
    function utilWrap(req, res, next) {
        try {
            fn(req, res, next);
        } catch (e) {
            next(e);
        }
    };

module.exports = {
    checkAsync,
    check
};
