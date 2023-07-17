const axios = require('axios').default;

class WixInboxApis {

    constructor(baseUrl, refreshTokenDao, wixOAuthFacade, appId) {
        this.refreshTokenDao = refreshTokenDao;
        this.wixOAuthFacade = wixOAuthFacade;
        this.baseUrl = baseUrl;
        this.appId = appId;
    }

    async sendMessage(instanceId, memberId, title, text) {
        let participantId = { 
            memberId : memberId
        }
        const conversationResult = await this.getConversation(instanceId, participantId)
        const conversationId = conversationResult?.conversation?.id
        const message = this.generateMessage(this.appId, conversationId, text, title)
        const refreshToken = await this.refreshTokenDao.getBy(instanceId);
        const {accessToken} = await this.wixOAuthFacade.getFreshAccessToken(refreshToken);
        return await axios.post(`${this.baseUrl}/messages`, message,  {headers: {authorization: accessToken}}).then(r => r.data);
    }

    async getConversation(instanceId, participantId) {
        const refreshToken = await this.refreshTokenDao.getBy(instanceId);
        const {accessToken} = await this.wixOAuthFacade.getFreshAccessToken(refreshToken);
        const data = {"participantId": participantId}
        return await axios.post(`${this.baseUrl}/conversations`,data ,  {headers: {authorization: accessToken}}).then(r => r.data).catch(error => console.log("error"));
    }

    generateMessage(appId, conversationId, title, text) {
        
        return {
            "conversation_id": conversationId,
            "typing_delay": 0,
            "send_as": appId,
            "message": {
                "target_channels": [
                    "CHAT"
                ],
                "content": {
                    "preview_text": "A coupon of the day",
                    "basic": {
                        "items": [
                            {
                                "text": text
                            }
                        ]
                    },
                    "title": title
                },
                "source_channel": "CHAT",
                "visibility": "BUSINESS_AND_PARTICIPANT",
                "direction": "BUSINESS_TO_PARTICIPANT"
            }
        }
    }


}

module.exports = {
    WixInboxApis
}
