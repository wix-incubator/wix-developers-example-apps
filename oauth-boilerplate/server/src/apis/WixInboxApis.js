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
        const message = this.generateMessage(conversationId, title, text,  "EMAIL");
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

    generateMessage(conversationId, title, text, channel) {
        
        return {
            "conversation_id": conversationId,
            "typing_delay": 0,
            "send_as": this.appId,
            "message": {
                "target_channels": [
                    channel
                ],
                "content": {
                    "preview_text": text,
                    "basic": {
                        "items": [
                            {
                                "text": text
                            }
                        ]
                    },
                    "title": title
                },
                "source_channel": channel,
                "visibility": "BUSINESS_AND_PARTICIPANT",
                "direction": "BUSINESS_TO_PARTICIPANT"
            }
        }
    }


}

module.exports = {
    WixInboxApis
}
