class AppInstallationsService {
    constructor(appInstallationsDao, buyersCountDao) {
        this.appInstallationsDao = appInstallationsDao;
        this.buyersCountDao = buyersCountDao;
    }


    async create(instanceId) {
        await this.appInstallationsDao.save(instanceId, {createDate: new Date(), isInstalled: true});
        await this.buyersCountDao.save(instanceId, 0);
    }

    async updatePremiumPlan(instanceId, newPlan) {
        const existing = await this.appInstallationsDao.getBy(instanceId);
        await this.appInstallationsDao.save(instanceId, {...existing, premiumPlan: newPlan});
    }

    async setUninstalled(instanceId) {
        const existing = await this.appInstallationsDao.getBy(instanceId);
        await this.appInstallationsDao.save(instanceId, {...existing, isInstalled: false});
    }

    async getBy(instanceId) {
        return await this.appInstallationsDao.getBy(instanceId);
    }

}

module.exports = {
    AppInstallationsService
}
