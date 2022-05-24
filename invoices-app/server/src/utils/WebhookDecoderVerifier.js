const jwt = require('jsonwebtoken');



class WebhookDecoderVerifier {

    constructor(publicKey) {
        this.publicKey = publicKey.replace(/\\n/g, '\n');
    }

    verifyAndDecode = webhook => {
        const decoded = jwt.verify(webhook, this.publicKey, { algorithms: ['RS256'] });
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
