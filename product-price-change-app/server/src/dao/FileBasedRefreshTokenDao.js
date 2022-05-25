const { RefreshTokenDao } = require("./RefreshTokenDao");


const fs = require('fs');

class FileBasedRefreshTokenDao extends RefreshTokenDao {
    constructor() {
        super();
        this.initStore = this.initStore.bind(this)
        this.store = this.initStore()
    }

    initStore() {
        if (fs.existsSync("refresh_token.localdb")) return JSON.parse(fs.readFileSync("refresh_token.localdb"))
        else { return {} }
    }

    async save(instanceId, refreshToken) {
        this.store[instanceId] = refreshToken;
        fs.writeFileSync("refresh_token.localdb", JSON.stringify(this.store))
    }

    async getBy(instanceId) {
        return this.store[instanceId];
    }
}

module.exports = {
    FileBasedRefreshTokenDao
}
