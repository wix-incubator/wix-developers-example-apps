const axios = require('axios');
const fs = require('fs')

class StoresApis {

    constructor(baseUrl, refreshTokenDao, wixOAuthFacade, databasePath) {
        this.refreshTokenDao = refreshTokenDao;
        this.wixOAuthFacade = wixOAuthFacade;
        this.baseUrl = baseUrl;
        this.databasePath = databasePath;
        this.queryOrders = this.queryOrders.bind(this)
        this.queryProducts = this.queryProducts.bind(this)
    }

    async queryOrders(instanceId, query = {}) {
        const refreshToken = await this.refreshTokenDao.getBy(instanceId);
        
        const { accessToken } = await this.wixOAuthFacade.getFreshAccessToken(refreshToken);
        
        const res = await axios.post(`${this.baseUrl}/v2/orders/query`, {}, { headers: { authorization: accessToken } })
        
        return res.data.orders.length
    }


    async queryProducts(instanceId, query = {}) {
        const refreshToken = await this.refreshTokenDao.getBy(instanceId);
        
        const { accessToken } = await this.wixOAuthFacade.getFreshAccessToken(refreshToken);
        
        const res = await axios.post(`${this.baseUrl}/v1/products/query`, { query: query }, { headers: { authorization: accessToken } })
        
        return res.data.products
    }


    async getProductCount(instanceId, productId) {
        const query = {
            "query":
            {
                "filter": {
                    "paymentStatus": "PAID",
                    "lineItems.productId": productId
                }
            }
        }
        const response = await this.queryOrders(instanceId, query)
        return response
    }
}

module.exports = {
    StoresApis
}
