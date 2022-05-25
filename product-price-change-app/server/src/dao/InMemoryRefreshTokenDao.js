const {RefreshTokenDao} = require("./RefreshTokenDao");

class InMemoryRefreshTokenDao extends RefreshTokenDao {
    constructor() {
        super();
        this.store = {}
    }


    async save(instanceId, refreshToken) {
        this.store[instanceId] = refreshToken;
    }

    async getBy(instanceId) {
        return this.store[instanceId];
    }
}

module.exports = {
    InMemoryRefreshTokenDao
}
