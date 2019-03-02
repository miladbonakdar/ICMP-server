const pingHost = require("../../cron/pingHost");

test("test ping host function", async done => {
    let res = await pingHost("127.0.0.1");
    expect(res).toBe(true);
    done();
});
