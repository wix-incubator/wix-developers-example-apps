const {startEnv} = require("./env");
const {v4: uuid} = require('uuid');

describe('AppLifecycleWebhookHandler', () => {

    const somePaidPlanPurchasedData = () => ({
        operationTimeStamp: new Date().toISOString(),
        vendorProductId: uuid(),
        cycle: 'MONTHLY',
        expiresOn: new Date().toISOString()
    });

    const {axiosInstance, webhooksTestkit} = startEnv();

    it('should store new installation', async () => {
        const instanceId = uuid();
        const webhook = webhooksTestkit.createJWTForWebhook(instanceId, 'AppInstalled', {})
        await axiosInstance.post('/webhooks/app-installed', webhook, {headers: {'content-type': 'text/plain'}});
        const result = await axiosInstance.get(`/api/installation?instanceId=${instanceId}`).then(r => r.data);
        expect(result.isInstalled).toBeTruthy();
    })

    it('should mark uninstalled when an event came for uninstall', async () => {
        const instanceId = uuid();
        const webhook = webhooksTestkit.createJWTForWebhook(instanceId, 'AppInstalled', {})
        const removedWebhook = webhooksTestkit.createJWTForWebhook(instanceId, 'AppRemoved', {})
        await axiosInstance.post('/webhooks/app-installed', webhook, {headers: {'content-type': 'text/plain'}});
        await axiosInstance.post('/webhooks/app-removed', removedWebhook, {headers: {'content-type': 'text/plain'}});
        const result = await axiosInstance.get(`/api/installation?instanceId=${instanceId}`).then(r => r.data);
        expect(result.isInstalled).toBeFalsy();
    })


    it('should set the premium plan when an premium event arrives', async () => {
        const instanceId = uuid();
        const webhook = webhooksTestkit.createJWTForWebhook(instanceId, 'AppInstalled', {})
        const paidPlanPurchasedData = somePaidPlanPurchasedData();
        const purchasedWebhook = webhooksTestkit.createJWTForWebhook(instanceId, 'PaidPlanPurchased', paidPlanPurchasedData)
        await axiosInstance.post('/webhooks/app-installed', webhook, {headers: {'content-type': 'text/plain'}});
        await axiosInstance.post('/webhooks/plan-purchased', purchasedWebhook, {headers: {'content-type': 'text/plain'}});
        const result = await axiosInstance.get(`/api/installation?instanceId=${instanceId}`).then(r => r.data);
        expect(result.premiumPlan).toEqual(paidPlanPurchasedData.vendorProductId);
    })

})
