const express = require("express");


class WebhooksController {
    constructor(installationsService, webhooksDecoder) {
        this._router = express.Router();
        this.installationsService = installationsService;
        this.webhooksDecoder = webhooksDecoder;
    }

    registerRoutes() {
        this._router.post('/app-removed', this.appRemovedWebhookHandler);
        this._router.post('/app-installed', this.appInstalledWebhookHandler);
    }

    appRemovedWebhookHandler = async (req, res) => {
        const {instanceId} = this.webhooksDecoder.verifyAndDecode(req.body);
        await this.installationsService.setUninstalled(instanceId);
        res.send('ok');
    }

    appInstalledWebhookHandler = async (req, res) => {
        const {instanceId} = this.webhooksDecoder.verifyAndDecode(req.body);
        await this.installationsService.create(instanceId);
        res.send('ok');
    }

    planPurchasedWebhookHandler = async (req, res) => {
        console.log(req.body);
        res.send('ok');
    }

    get router() {
        return this._router;
    }



}

module.exports = {
    WebhooksController
}
