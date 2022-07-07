const express = require('express');
const cors = require('cors');
const { InstanceDecoder } = require("./utils/InstanceDecoder");
const { FileBasedRefreshTokenDao } = require("./dao/FileBasedRefreshTokenDao")
const { WixOAuthFacade } = require("./tokens/WixOAuthFacade");
const { StoresApis } = require("./apis/StoresApis");
const { AppApis } = require("./apis/AppApis");
const { WixAuthController } = require("./controllers/WixAuthController");
const { ApiController } = require("./controllers/ApiController");
const { WebhooksController } = require("./controllers/WebhooksController");
const { json, text } = require('body-parser');
const { WebhookDecoderVerifier } = require("./utils/WebhookDecoderVerifier");
const { FileBasedAppInstallationsDao } = require("./dao/FileBasedAppInstallationsDao");
const { AppInstallationsService } = require("./services/AppInstallationsService");
const { BuyersCountService } = require("./services/BuyersCountService");
const { FileBasedBuyersCountDao } = require('./dao/FileBasedBuyersCountDao');

const startServer = (config) => {
  const app = express();
  app.use(cors());

  /*
    APP_ID and APP_SECRET are secrets and you shouldn't share them with anyone!
    Their values resides in .env file and you should NOT COMMIT THEM TO GITHUB!
  */
  const { APP_ID, APP_SECRET, redirectUrl, wixBaseUrl, WEBHOOK_PUBLIC_KEY } = config;

  app.use(text());
  app.use(json());

  const instanceDecoder = new InstanceDecoder(APP_SECRET);
  const refreshTokenDao = new FileBasedRefreshTokenDao();
  const installationsDao = new FileBasedAppInstallationsDao();
  const buyersCountDao = new FileBasedBuyersCountDao();
  const installationsService = new AppInstallationsService(installationsDao, buyersCountDao);
  const wixOAuthFacade = new WixOAuthFacade(APP_ID, APP_SECRET);
  const storesApis = new StoresApis('https://www.wixapis.com/stores/', refreshTokenDao, wixOAuthFacade)
  const buyersCountService = new BuyersCountService(buyersCountDao, storesApis);
  const appApis = new AppApis('https://www.wixapis.com/apps/v1', refreshTokenDao, wixOAuthFacade);
  const webhookDecoderVerifier = new WebhookDecoderVerifier(WEBHOOK_PUBLIC_KEY);
  const wixAuthController = new WixAuthController(APP_ID, wixOAuthFacade, refreshTokenDao, redirectUrl, wixBaseUrl);
  const apiController = new ApiController(instanceDecoder, storesApis, appApis, installationsService, buyersCountService);
  const webhooksController = new WebhooksController(installationsService, webhookDecoderVerifier)

  app.use('/auth', wixAuthController.router)
  app.use('/api', apiController.router)
  app.use('/webhooks', webhooksController.router)

  return app;
}

module.exports = {
  startServer
}
