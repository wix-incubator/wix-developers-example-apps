class BuyersCountService {
    constructor(buyersCountDao) {
        this.buyersCountDao = buyersCountDao;
    }

    async set(instanceId, buyersCount) {       
        console.log("sd1") 
        this.buyersCountDao.save()
        // await this.buyersCountDao.save(instanceId, buyersCount);
    }

    async get(instanceId) {        
        await this.buyersCountDao.getBy(instanceId);
    }
}

module.exports = {
    BuyersCountService
}
