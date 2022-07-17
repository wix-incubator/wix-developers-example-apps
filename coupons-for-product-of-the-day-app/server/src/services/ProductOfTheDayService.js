

class ProductOfTheDayService {

    constructor(FileBasedAppInstallationsDao) {
        this.FileBasedAppInstallationsDao = FileBasedAppInstallationsDao;
    }

    async saveProductOfTheDay(instanceId, productId, discountPercentage) {
        this.FileBasedAppInstallationsDao.saveProductOfTheDay(instanceId, productId, discountPercentage)
    }

    async getProductOfTheDay(instanceId) {
        return this.FileBasedAppInstallationsDao.getBy(instanceId);
    }
}

module.exports = {
    ProductOfTheDayService
}
