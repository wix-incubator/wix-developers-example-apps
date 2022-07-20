const axios = require('axios');
class WixInboxApis {

    constructor(baseUrl, refreshTokenDao, wixOAuthFacade) {
        this.refreshTokenDao = refreshTokenDao;
        this.wixOAuthFacade = wixOAuthFacade;
        this.baseUrl = baseUrl;
        //this.getAppInstance = this.getAppInstance.bind(this)
    }

    async sendMessage(instanceId, message) {
        const refreshToken = await this.refreshTokenDao.getBy(instanceId);
        const {accessToken} = await this.wixOAuthFacade.getFreshAccessToken(refreshToken);
        return await axios.post(`${this.baseUrl}/messages`, message,  {headers: {authorization: accessToken}}).then(r => r.data);
    }
}

module.exports = {
    WixInboxApis
}
