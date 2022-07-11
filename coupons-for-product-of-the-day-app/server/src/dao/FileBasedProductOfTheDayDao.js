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

    async setProductOfTheDay(productId, discountPercentage) {
        this.store.productOfTheDay = productId;
        this.store.discountPercentage = discountPercentage;
        fs.writeFileSync("product_of_the_day.localdb", JSON.stringify(this.store));
    }

    async getProductOfTheDay() {
        return this.store.productOfTheDay;
    }

    async getDiscountPercentage() {
        return this.store.discountPercentage;
    }
}

module.exports = {
    FileBasedProductOfTheDayDao
}
