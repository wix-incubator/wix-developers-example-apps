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
        console.log('before decode');
        const parsedInstance = this.instanceDecoder.decodeOrThrow(req.query.instance);
        console.log('parsedInstance', parsedInstance);
        //const getAppInstancePromise = this.appApis.getAppInstance(parsedInstance.instanceId);
        //const siteOrdersPromise = this.storesApis.queryOrders(parsedInstance.instanceId);
        //const [siteInfo, siteOrders] = await Promise.all([getAppInstancePromise, siteOrdersPromise]);
        res.json({parsedInstance});
    }

}

module.exports = {
    ApiController
}
