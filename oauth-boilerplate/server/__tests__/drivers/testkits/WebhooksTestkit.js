const crypto = require('crypto');
const jwt = require('jsonwebtoken');

class WebhooksTestkit {
    get privateKey() {
        return this._privateKey;
    }

    get publicKey() {
        return this._publicKey;
    }

    constructor() {
        const pair = crypto.generateKeyPairSync('rsa', {modulusLength: 4096});
        this._publicKey = pair.publicKey.export({format: 'pem', type: 'spki'});
        this._privateKey = pair.privateKey.export({format: 'pem', type: 'pkcs1'});
    }

    createJWTForWebhook = (instanceId, eventType, data) => {
        return jwt.sign({
            data: JSON.stringify({
                instanceId,
                eventType,
                data: JSON.stringify(data)
            })
        }, this._privateKey, {algorithm: 'RS256'});
    }


}


module.exports = {
    WebhooksTestkit
}
