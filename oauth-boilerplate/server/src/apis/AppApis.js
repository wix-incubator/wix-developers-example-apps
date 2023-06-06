const axios = require('axios').default;
class AppApis {

    constructor(baseUrl, refreshTokenDao, wixOAuthFacade) {
        this.refreshTokenDao = refreshTokenDao;
        this.wixOAuthFacade = wixOAuthFacade;
        this.baseUrl = baseUrl;
        this.getAppInstance = this.getAppInstance.bind(this)
    }

    async getAppInstance(instanceId) {
        const refreshToken = await this.refreshTokenDao.getBy(instanceId);
        const {accessToken} = refreshToken ? await this.wixOAuthFacade.getFreshAccessToken(refreshToken): "";
        return accessToken ? await axios.get(`${this.baseUrl}/instance`, {headers: {authorization: accessToken}}).then(r => r.data): `instanceId: ${instanceId} was not found`;
    }
}

module.exports = {
    AppApis
}
