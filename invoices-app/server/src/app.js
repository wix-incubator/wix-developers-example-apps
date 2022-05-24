const express = require('express');
const {InstanceDecoder} = require("./utils/InstanceDecoder");
const {InMemoryRefreshTokenDao} = require("./dao/InMemoryRefreshTokenDao");
const {WixOAuthFacade} = require("./tokens/WixOAuthFacade");
const {StoresApis} = require("./apis/StoresApis");
const {AppApis} = require("./apis/AppApis");
const {WixAuthController} = require("./controllers/WixAuthController");
const {ApiController} = require("./controllers/ApiController");
const {WebhooksController} = require("./controllers/WebhooksController");
const {json, text} = require('body-parser');
const {WebhookDecoderVerifier} = require("./utils/WebhookDecoderVerifier");
const {InMemoryAppInstallationsDao} = require("./dao/InMemoryAppInstallationsDao");
const {AppInstallationsService} = require("./services/AppInstallationsService");

const startServer = (config) => {
    const app = express();

    /*
      APP_ID and APP_SECRET are secrets and you shouldn't share them with anyone!
      Their values resides in .env file and yous should NOT COMMIT THEM TO GITHUB!
    */
    const {APP_ID, APP_SECRET, redirectUrl, wixBaseUrl, WEBHOOK_PUBLIC_KEY} = config;
    console.log(WEBHOOK_PUBLIC_KEY);

    app.use(text());
    app.use(json());

    const instanceDecoder = new InstanceDecoder(APP_SECRET);
    const refreshTokenDao = new InMemoryRefreshTokenDao();
    const installationsDao = new InMemoryAppInstallationsDao();
    const installationsService = new AppInstallationsService(installationsDao);
    const wixOAuthFacade = new WixOAuthFacade(wixBaseUrl, APP_ID, APP_SECRET);
    const storesApis = new StoresApis('https://www.wixapis.com/stores/v2/orders', refreshTokenDao, wixOAuthFacade)
    const appApis = new AppApis('https://www.wixapis.com/apps/v1', refreshTokenDao, wixOAuthFacade);
    const webhookDecoderVerifier = new WebhookDecoderVerifier(WEBHOOK_PUBLIC_KEY);

    const wixAuthController = new WixAuthController(APP_ID, wixOAuthFacade, refreshTokenDao, redirectUrl, wixBaseUrl);
    const apiController = new ApiController(instanceDecoder, storesApis, appApis, installationsService);
    const webhooksController = new WebhooksController(installationsService, webhookDecoderVerifier)

    app.use('/auth', wixAuthController.router)
    app.use('/api', apiController.router);
    app.use('/webhooks', webhooksController.router)

    return app;
}

module.exports = {
    startServer
}
