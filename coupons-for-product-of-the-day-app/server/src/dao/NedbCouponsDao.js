const { CouponsDao } = require("./CouponsDao");
const Datastore = require('nedb')

class NedbCouponsDao extends CouponsDao {
    constructor() {
        super();
        this.store = this.initStore()
        this.store.persistence.setAutocompactionInterval( 5000 /*ms*/ )
    }

    initStore() {
        return new Datastore({ filename: '/tmp/coupons.localdb', autoload: true });
    }

    async save(instanceId, conversationId, date, couponData) {
        this.store.update(
            {"_id": conversationId}, 
            { 
             "_id": conversationId, 
             "instanceId": instanceId,
             "conversationId": conversationId,
             "date": date, 
             "couponData": couponData 
            },
            {upsert: true}
        )
    }

    async getBy(conversationId, date) {
        console.log("conversationId", conversationId)
        console.log("date", date)
        return new Promise((resolve, reject) => {
            this.store.find( { $and: [{conversationId : conversationId}, {date: date}] }, function (err, doc) {
                if(err){
                    reject(err);
                }
                console.log('found coupon', doc)
                resolve(doc);
            });
        });
    }
}

module.exports = {
    NedbCouponsDao
}
