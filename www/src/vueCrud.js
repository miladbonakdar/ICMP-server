import crudly from "crudly";

export default {
    install: function(Vue, config, name = "$gate") {
        let myGate = new crudly(config);

        myGate.afterEach(response => {
            if (response.status == 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                localStorage.removeItem("logedOn");
                document.location.href = "/";
            }
            return response;
        });

        myGate.beforeEach(request => {
            let accessToken = localStorage.getItem("token");
            if (accessToken) request.setProperty("headers", { Authorization: "bearer " + accessToken });
        });

        Object.defineProperty(Vue.prototype, name, { value: myGate });
    }
};
