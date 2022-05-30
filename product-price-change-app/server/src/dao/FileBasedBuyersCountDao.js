const { BuyersCountDao } = require("./BuyersCountDao");
const fs = require('fs');

class FileBasedBuyersCountDao extends BuyersCountDao {
    constructor() {
        super();
        this.initStore = this.initStore.bind(this)
        this.store = this.initStore()
    }

    initStore() {
        if (fs.existsSync("buyers_count.localdb")) return JSON.parse(fs.readFileSync("buyers_count.localdb"))
        else { return {} }
    }

    async save(instanceId, buyersCount) {
        this.store[instanceId] = buyersCount;        
        fs.writeFileSync("buyers_count.localdb", JSON.stringify(this.store))
    }

    async getBy(instanceId) {
        return this.store[instanceId];
    }
}

module.exports = {
    FileBasedBuyersCountDao
}
