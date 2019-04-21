module.exports = (...middlewares) => {
    const list = [];
    for (const mw of middlewares) {
        if (mw) list.push(mw);
    }
    if (list.length == 0)
        list.push((req, res, next) => {
            next();
        });
    return list;
};
