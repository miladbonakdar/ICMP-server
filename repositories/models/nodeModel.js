const itemBase = require('./itemBase');
class node extends itemBase{
    constructor(data = null) {
        super(data);
        if(data)
        {
            this.name = data.name || null;
            this.hostName = data.hostName || null;
            this.ip = data.hostName || null;
            this.areaId = data.areaId || null;
            this.alive = data.alive || false;
        }else{
            this.name = null;
            this.hostName = null;
            this.ip = null;
            this.areaId = null;
            this.alive = false;
        }
    }
}
