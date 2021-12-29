const {startEnv} = require("./env");
const {v4: uuid} = require('uuid');

describe('AppLifecycleWebhookHandler', () => {

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


})
