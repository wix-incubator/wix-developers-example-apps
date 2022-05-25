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
        return await axios.post(`${this.baseUrl}/orders/query`, query, { headers: { authorization: accessToken } }).then(r => r.data);
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
        const resposne = this.queryOrders(instanceId, query)
    }
}

module.exports = {
    StoresApis
}
