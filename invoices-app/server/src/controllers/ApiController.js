const express = require("express");


class ApiController {
    constructor(instanceDecoder, cashierApis, appApis, installationsService) {
        this._router = express.Router();
        this.instanceDecoder = instanceDecoder;
        this.cashierApis = cashierApis;
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
        const siteOrdersPromise = this.cashierApis.getPastTransactions(parsedInstance.instanceId);
        const [siteInfo, siteOrders] = await Promise.all([getAppInstancePromise, siteOrdersPromise]);
        res.json({parsedInstance, siteInfo, siteOrders});
    }

}

module.exports = {
    ApiController
}
