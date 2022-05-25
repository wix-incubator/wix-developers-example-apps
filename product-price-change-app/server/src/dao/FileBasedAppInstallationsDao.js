const { AppInstallationsDao } = require("./AppInstallationsDao");
const fs = require('fs');

class FileBasedAppInstallationsDao extends AppInstallationsDao {
    constructor() {
        super();
        this.initStore = this.initStore.bind(this)
        this.store = this.initStore()
    }

    initStore() {
        if (fs.existsSync("app_installs.localdb")) return JSON.parse(fs.readFileSync("app_installs.localdb"))
        else { return {} }
    }
    async save(instanceId, data) {
        this.store[instanceId] = data;
        fs.writeFileSync("app_installs.localdb", JSON.stringify(this.store))
    }

    async getBy(instanceId) {
        return this.store[instanceId];
    }
}

module.exports = {
    FileBasedAppInstallationsDao
}
