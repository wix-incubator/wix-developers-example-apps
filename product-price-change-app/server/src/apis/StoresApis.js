const axios = require('axios');

class StoresApis {

    constructor(baseUrl, refreshTokenDao, wixOAuthFacade) {
        this.refreshTokenDao = refreshTokenDao;
        this.wixOAuthFacade = wixOAuthFacade;
        this.baseUrl = baseUrl;
        this.queryOrders = this.queryOrders.bind(this)
    }

    async queryOrders(instanceId, query = {}) {
        const refreshToken = await this.refreshTokenDao.getBy(instanceId);
        
        const { accessToken } = await this.wixOAuthFacade.getFreshAccessToken(refreshToken);
        
        const res = await axios.post(`${this.baseUrl}/query`, {}, { headers: { authorization: accessToken } })
        
        return res.data.orders.length
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
