const express = require("express");


class ApiController {
    constructor(instanceDecoder, storesApis, appApis, installationsService) {
        this._router = express.Router();
        this.instanceDecoder = instanceDecoder;
        this.storesApis = storesApis;
        this.installationsService = installationsService;
        this.appApis = appApis;
        this.registerRoutes();
    }

    registerRoutes() {
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