const axios = require('axios');


class StoresApis {

    constructor(baseUrl, refreshTokenDao, wixOAuthFacade, databasePath) {
        this.refreshTokenDao = refreshTokenDao;
        this.wixOAuthFacade = wixOAuthFacade;
        this.baseUrl = baseUrl;
        this.databasePath = databasePath;
        //this.queryOrders = this.queryOrders.bind(this)
        //this.queryProducts = this.queryProducts.bind(this)
    }

    async queryOrders(instanceId, query = {}) {
        const refreshToken = await this.refreshTokenDao.getBy(instanceId);

        const { accessToken } = await this.wixOAuthFacade.getFreshAccessToken(refreshToken);

        const res = await axios.post(`${this.baseUrl}/v2/orders/query`, {}, { headers: { authorization: accessToken } })

        return res.data
    }


    async queryProducts(instanceId, query) {
        const refreshToken = await this.refreshTokenDao.getBy(instanceId);
        const { accessToken } = await this.wixOAuthFacade.getFreshAccessToken(refreshToken);

        const res = await axios.post(`${this.baseUrl}/v1/products/query`, { query: query }, { headers: { authorization: accessToken } })

        return res.data.products
    }

}

module.exports = {
    StoresApis
}
