const itemBase = require("./itemBase");
class area extends itemBase {
    constructor(data = null) {
        super(data);
        if (data) {
            this.name = data.name || null;
            this.nodes = data.nodes || [];
        } else {
            this.name = null;
            this.nodes = [];
        }
    }
}
