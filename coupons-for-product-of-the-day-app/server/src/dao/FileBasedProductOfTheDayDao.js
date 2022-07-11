const fs = require('fs');

class FileBasedProductOfTheDayDao {
    constructor() {
        super();
        this.initStore() = this.initStore.bind();
        this.store = this.initStore();
    }

    initStore() {
        if (fs.existsSync("product_of_the_day.localdb")) return JSON.parse(fs.readFileSync("product_of_the_day.localdb"))
        else { return {} }
    }

    async set(productId) {
        this.store.productOfTheDay = productId;
        fs.writeFileSync("product_of_the_day.localdb", JSON.stringify(this.store));
    }

    async get() {
        return this.store.productOfTheDay;
    }
}

module.exports = {
    FileBasedProductOfTheDayDao
}
