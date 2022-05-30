const express = require("express");


class ApiController {
    constructor(instanceDecoder, storesApis, appApis, installationsService, buyersCountService) {
        this._router = express.Router();
        this.instanceDecoder = instanceDecoder;
        this.storesApis = storesApis;
        this.installationsService = installationsService;
        this.buyersCountService = buyersCountService;
        this.appApis = appApis;
        this.registerRoutes();
    }

    registerRoutes() {
        this._router.post('/buyers-count', this.updateBuyersCountController)
        this._router.get('/buyers-count', this.buyersCountController)
        this._router.get('/dashboard', this.dashboardController);
        this._router.get('/installation', this.installationController);
    }

    get router() {
        return this._router;
    }

    installationController = async (req, res) => {
        const result = await this.installationsService.getBy(req.query.instanceId);
        res.json(result);
    }

    buyersCountController = async (req, res) => {
        const parsedInstance = this.instanceDecoder.decodeOrThrow(req.query.instance);
        const buyersCount = this.buyersCountService.get(parsedInstance.instanceId, req.query.productId)
        res.json({buyersCount});
    }

    updateBuyersCountController = async (req, res) => {
        const parsedInstance = this.instanceDecoder.decodeOrThrow(req.query.instance);
        await this.buyersCountService.set(parsedInstance.instanceId, req.body.delta)
        const currentDelta = await this.buyersCountService.getDelta(parsedInstance.instanceId)
        res.json({currentDelta})
    }

    dashboardController = async (req, res) => {
        const parsedInstance = this.instanceDecoder.decodeOrThrow(req.query.instance);
        const getAppInstancePromise = this.appApis.getAppInstance(parsedInstance.instanceId);
        const [siteInfo] = await Promise.all([getAppInstancePromise]);
        res.json({parsedInstance, siteInfo});
    }

}

module.exports = {
    ApiController
}
