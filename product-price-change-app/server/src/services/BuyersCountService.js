class BuyersCountService {
    constructor(buyersCountDao, storesFacade) {
        this.buyersCountDao = buyersCountDao;
        this.storesFacade = storesFacade;
    }

    async set(instanceId, buyersCount) {       
        await this.buyersCountDao.save(instanceId, buyersCount)       
    }

    async getDelta(instanceId) {        
        const delta = await this.buyersCountDao.getBy(instanceId);
        return Number(delta)
    }

    async get(instanceId, productId) {        
        const delta = await this.buyersCountDao.getBy(instanceId);
        const realCount = await this.storesFacade.getProductCount(instanceId, productId)
        return Number(delta) + Number(realCount)
    }
}

module.exports = {
    BuyersCountService
}
