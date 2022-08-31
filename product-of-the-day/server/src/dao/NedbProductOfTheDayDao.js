const { ProductOfTheDayDao } = require("./ProductOfTheDayDao");
const Datastore = require('nedb')


class NedbProductOfTheDayDao extends ProductOfTheDayDao {
    constructor() {
        super();
        this.filename = process.platform === "win32"?'c:\windows\temp\product_of_the_day.localdb':'/tmp/product_of_the_day.localdb'
        this.store = this.initStore()
        this.store.persistence.setAutocompactionInterval( 5000 /*ms*/ )
    }

    initStore() {
        return new Datastore({ filename: this.filename, autoload: true });
    }

    async saveProductOfTheDay(instanceId, productId, discountPercentage){
        this.store.update(
            {"_id": instanceId },
            {"_id": instanceId, "instanceId": instanceId, "productId": productId, "discountPercentage": discountPercentage}, 
            {upsert: true}
        )
    }

    async getBy(instanceId) {
        return new Promise((resolve, reject) => {
            this.store.findOne({instanceId : instanceId}, function (err, doc) {
                if(err){
                    reject(err);
                }
                resolve(doc);
            });
        });
    }
}

module.exports = {
    NedbProductOfTheDayDao
}
