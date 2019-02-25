module.exports = {
    /** TODO: add description
     *  
     */
    check: fn => () => {
        try {
            fn();
        } catch (e) {
            expect(e).toBeUndefined();
        }
    },
    /** TODO: add description
     *  
     */
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
