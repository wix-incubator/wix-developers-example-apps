const jwt = require('jsonwebtoken');



class WebhookDecoderVerifier {

    constructor(publicKey) {
        this.publicKey = publicKey;
    }

    verifyAndDecode = webhook => {
        const decoded = jwt.verify(webhook, this.publicKey, {ignoreExpiration: true});
        const {instanceId, eventType, data} = JSON.parse(decoded.data);
        return {
            instanceId,
            eventType,
            data: JSON.parse(data)
        }
    }

}

module.exports = {
    WebhookDecoderVerifier
}
