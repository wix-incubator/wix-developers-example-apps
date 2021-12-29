const {AppInstallationsDao} = require("./AppInstallationsDao");

class InMemoryAppInstallationsDao extends AppInstallationsDao {
    constructor() {
        super();
        this.store = {}
    }

    async save(instanceId, data) {
        this.store[instanceId] = data;
    }

    async getBy(instanceId) {
        return this.store[instanceId];
    }
}

module.exports = {
    InMemoryAppInstallationsDao
}
