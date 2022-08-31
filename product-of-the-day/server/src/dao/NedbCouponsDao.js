const { CouponsDao } = require("./CouponsDao");
const Datastore = require('nedb')
const path = require('path');
const { Console } = require("console");


class NedbCouponsDao extends CouponsDao {
    constructor() {
        super();
        this.filename = process.platform === "win32"?'c:\windows\temp\coupons.localdb':'/tmp/coupons.localdb'
        this.store = this.initStore()
        this.store.persistence.setAutocompactionInterval( 5000 /*ms*/ )
    }
    
    initStore() {
        return new Datastore({ filename: this.filename, autoload: true });
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
        return new Promise((resolve, reject) => {
            this.store.find( { $and: [{conversationId : conversationId}, {date: date}] }, function (err, doc) {
                if(err){
                    reject(err);
                }
                resolve(doc);
            });
        });
    }
}

module.exports = {
    NedbCouponsDao
}
