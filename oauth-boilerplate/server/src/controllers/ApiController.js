const express = require("express");
const schemas = require('./schemas');
const {validatePostParams, validateGetParams} = require('../middlewares/validateParams');


class ApiController {
    constructor(instanceDecoder, installationsService, appApis) {
        this._router = express.Router();
        this.instanceDecoder = instanceDecoder;
        this.installationsService = installationsService;
        this.appApis = appApis;
        this.registerRoutes();
    }

    registerRoutes() {
        this._router.get('/dashboard', validateGetParams(schemas.dashboard), this.dashboardController);
        this._router.get('/test', this.testController)
        this._router.get('/installation', this.installationController);
    }

    get router() {
        return this._router;
    }

    testController = async (req, res) => {
        res.status(200).send('API is OK');
    }

    installationController = async (req, res) => {
        const result = await this.installationsService.getBy(req.query.instanceId);
        res.json(result);
    }

    dashboardController = async (req, res) => {
        const parsedInstance = this.instanceDecoder.decodeOrThrow(req.query.instance);
        const result = await this.appApis.getAppInstance(parsedInstance.instanceId)
        res.json(result);
    }
}

module.exports = {
    ApiController
}
