const express = require("express");
const schemas = require('./schemas');
const {validatePostParams, validateGetParams} = require('../middlewares/validateParams');


class ApiController {
    constructor(instanceDecoder, storesApis, appApis, installationsService, productOfTheDayService) {
        this._router = express.Router();
        this.instanceDecoder = instanceDecoder;
        this.storesApis = storesApis;
        this.installationsService = installationsService;
        this.appApis = appApis;
        this.productOfTheDayService = productOfTheDayService;
        this.registerRoutes();
    }

    registerRoutes() {
        this._router.get('/dashboard', validateGetParams(schemas.dashboard), this.dashboardController);
        this._router.get('/installation', this.installationController);
        this._router.get('/test',validateGetParams(schemas.test), this.testController)
        this._router.post('/product',validatePostParams(schemas.productOfTheDay), this.productOfTheDayController)
        this._router.get('/search',validateGetParams(schemas.searchProduct), this.searchProductOfTheDayController)
    }

    get router() {
        return this._router;
    }

    testController = async (req, res) => {
        res.json('api is ok');
    }

    searchProductOfTheDayController = async (req, res) => {
        const parsedInstance = this.instanceDecoder.decodeOrThrow(req.query.instance);
        const query = {"filter":`{\"name\": {\"$startsWith\": \"${req.query.term}\"}}`}
        const result = await this.storesApis.queryProducts(parsedInstance.instanceId, query)
        res.json(result);
    }

    installationController = async (req, res) => {
        const result = await this.installationsService.getBy(req.query.instanceId);
        res.json(result);
    }

    productOfTheDayController = async (req, res) => {
        const parsedInstance = this.instanceDecoder.decodeOrThrow(req.body.instance);
        await this.productOfTheDayService.saveProductOfTheDay(parsedInstance.instanceId, req.body.productId, req.body.discountPercentage)
        res.status(200).send();
    }

    dashboardController = async (req, res) => {
        try {
            const parsedInstance = this.instanceDecoder.decodeOrThrow(req.query.instance);
            const productOfTheDayData = await this.productOfTheDayService.getProductOfTheDay(parsedInstance.instanceId)
            const query = {"filter":`{\"id\": {\"$eq\": \"${productOfTheDayData.productId}\"}}`}
            const productData = await this.storesApis.queryProducts(parsedInstance.instanceId, query)
            res.json({"productOfTheDay" : productData, "discountPercentage": productOfTheDayData.discountPercentage});
        } catch {
            res.status(500).send("an error occurred");
        }
    }

}

module.exports = {
    ApiController
}
