module.exports = {
    check: fn => () => {
        try {
            fn();
        } catch (e) {
            expect(e).toBeUndefined();
        }
    },
    checkForException: (fn,exceptionMessage) => () => {
        try {
            fn();
        } catch (e) {
            expect(e).toBeDefined();
            expect(e.message).toBeDefined();
            expect(e.message).toBe(exceptionMessage);
        }
    }
};
