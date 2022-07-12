const { ProductOfTheDayDao } = require("./ProductOfTheDayDao");
const fs = require('fs');


class FileBasedProductOfTheDayDao extends ProductOfTheDayDao {
    constructor() {
        super();
        this.initStore = this.initStore.bind(this)
        this.store = this.initStore()
    }

    initStore() {
        if (fs.existsSync("product_of_the_day.localdb")) return JSON.parse(fs.readFileSync("product_of_the_day.localdb"))
        else { return {} }
    }

    async savePorductOfTheDay(instanceId, productId, discountPercentage) {
        this.store[instanceId] = {"productId" : productId, "discountPercentage": discountPercentage}
        fs.writeFileSync("product_of_the_day.localdb", JSON.stringify(this.store));
    }

    async getBy(instanceId){
        return this.store[instanceId];
    }
}

module.exports = {
    FileBasedProductOfTheDayDao
}
