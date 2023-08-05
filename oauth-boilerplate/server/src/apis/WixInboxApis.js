const axios = require('axios').default;

class WixInboxApis {

    constructor(baseUrl, refreshTokenDao, wixOAuthFacade, appId) {
        this.refreshTokenDao = refreshTokenDao;
        this.wixOAuthFacade = wixOAuthFacade;
        this.baseUrl = baseUrl;
        this.appId = appId;
    }

    async sendMessage(instanceId, contactId, title, text) {
        let participantId = { 
            contactId : contactId
        }
        const conversationResult = await this.getConversation(instanceId, participantId)
        const conversationId = conversationResult?.conversation?.id
        const message = this.generateMessage(conversationId, title, text,  "EMAIL");
        const refreshToken = await this.refreshTokenDao.getBy(instanceId);
        const {accessToken} = await this.wixOAuthFacade.getFreshAccessToken(refreshToken);
        return await axios.post(`${this.baseUrl}/messages`, message,  {headers: {authorization: accessToken}}).then(r => r.data);
    }

    async getConversation(instanceId, participantId) {
        const refreshToken = await this.refreshTokenDao.getBy(instanceId);
        const {accessToken} = await this.wixOAuthFacade.getFreshAccessToken(refreshToken);
        const data = {"participantId": participantId}
        return await axios.post(`${this.baseUrl}/conversations`,data ,  {headers: {authorization: accessToken}}).then(r => r.data);
    }

    generateMessage(conversationId, title, text, channel) {
        return {
            "conversation_id": conversationId,
            "typing_delay": 0,
            "message": {
                "target_channels": [
                    channel
                ],
                "content": {
                    "basic": {
                        "items": [
                            {
                                "text": text
                            }
                        ]
                    },
                    "title": title
                },
                "visibility": "BUSINESS_AND_PARTICIPANT",
                "direction": "BUSINESS_TO_PARTICIPANT",
                "sender": {
                    "app_id": this.appId
                }
            }
        }
    }
}

module.exports = {
    WixInboxApis
}
