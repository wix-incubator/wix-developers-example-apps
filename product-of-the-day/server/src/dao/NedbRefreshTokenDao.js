const { RefreshTokenDao } = require("./RefreshTokenDao");
const Datastore = require('nedb')

class NedbRefreshTokenDao extends RefreshTokenDao {
    constructor() {
        super();
        //this.initStore = this.initStore.bind(this)
        this.store = this.initStore()
        this.store.persistence.setAutocompactionInterval( 5000 /*ms*/ )
    }

    initStore() {
        return new Datastore({ filename: '/tmp/refresh_token.localdb', autoload: true });
    }

    async save(instanceId, refreshToken) {
        this.store.update(
            {"_id": instanceId },
            {"_id": instanceId, "instanceId": instanceId, "refreshToken": refreshToken}, 
            {upsert: true}
        )
        
    }

    async getBy(instanceId) {
        return new Promise((resolve, reject) => {
            this.store.findOne({instanceId : instanceId}, function (err, doc) {
                if(err){
                    reject(err);
                }
                resolve(doc.refreshToken);
            });
        });
    }
}

module.exports = {
    NedbRefreshTokenDao
}
