const store = {}
class DB {
    static list() {
        return store;
    }

    static saveWixToken(instanceId, wixRefreshToken) {
        return store[instanceId] = { wixRefreshToken, instanceId };
    }

    static getApiTokenByInstanceId(instanceId) {
        return store[instanceId]
    }
}

exports.DB = DB