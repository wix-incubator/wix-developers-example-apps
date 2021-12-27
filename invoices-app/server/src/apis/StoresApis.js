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
        const {accessToken} = await this.wixOAuthFacade.getFreshAccessToken(refreshToken);
        return await axios.post(`${this.baseUrl}/orders/query`, query, {headers: {authorization: accessToken}}).then(r => r.data);
    }
}

module.exports = {
    StoresApis
}
