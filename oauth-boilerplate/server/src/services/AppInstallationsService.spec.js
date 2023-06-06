const {NedbAppInstallationsDao} = require("../dao/NedbAppInstallationDao");
const {randomString} = require("../../__tests__/utils");
const MockDate = require('mockdate');
const {AppInstallationsService} = require('./AppInstallationsService');
describe('AppInstallationsService', () => {

    const date = new Date();
    MockDate.set(date)

    it('should create a new object for some instanceId', async () => {
        const dao = new NedbAppInstallationsDao();
        const service = new AppInstallationsService(dao);
        const instanceId = randomString();
        await service.create(instanceId);
        await expect(service.getBy(instanceId)).resolves.toEqual(expect.objectContaining({ createDate: date, isInstalled: true}));
    });

    it('should allow updating premium plan', async () => {
        const dao = new NedbAppInstallationsDao();
        const service = new AppInstallationsService(dao);
        const instanceId = randomString();
        await service.create(instanceId);
        const newPlan = randomString();
        await service.updatePremiumPlan(instanceId, newPlan)
        await expect(service.getBy(instanceId)).resolves.toEqual(expect.objectContaining({ createDate: date, isInstalled: true, premiumPlan: newPlan }));
    });

    it('should allow updating installed flag', async () => {
        const dao = new NedbAppInstallationsDao();
        const service = new AppInstallationsService(dao);
        const instanceId = randomString();
        await service.create(instanceId);
        await service.setUninstalled(instanceId)
        await expect(service.getBy(instanceId)).resolves.toEqual(expect.objectContaining({createDate: date, isInstalled: false}));
    });
})
