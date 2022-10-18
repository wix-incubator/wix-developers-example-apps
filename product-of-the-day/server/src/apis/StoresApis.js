const axios = require('axios').default;


class StoresApis {

    constructor(baseUrl, refreshTokenDao, wixOAuthFacade) {
        this.refreshTokenDao = refreshTokenDao;
        this.wixOAuthFacade = wixOAuthFacade;
        this.baseUrl = baseUrl;
    }


    async queryProducts(instanceId, query) {
        const refreshToken = await this.refreshTokenDao.getBy(instanceId);
        const { accessToken } = await this.wixOAuthFacade.getFreshAccessToken(refreshToken);

        const res = await axios.post(`${this.baseUrl}/v1/products/query`, { query: query }, { headers: { authorization: accessToken } })

        return res.data
    }

}

module.exports = {
    StoresApis
}
