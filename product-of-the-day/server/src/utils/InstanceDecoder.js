const crypto = require('crypto');

class InstanceDecoder {

    constructor(secret) {
        this.secret = secret;
    }

    normalizedBase64 = base64String => base64String.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')

    decodeOrThrow = instance => {
        const [signature, payload] = instance.split('.');
        const newSignature = crypto.createHmac('sha256', this.secret)
                                   .update(payload)
                                   .digest('base64');

        if (this.normalizedBase64(newSignature) === this.normalizedBase64(signature)) {
            return JSON.parse(Buffer.from(payload, 'base64').toString('utf8'))
        } else {
            throw new InvalidSignature()
        }
    };

}

class InvalidSignature extends Error {
    constructor() {
        super('Invalid Signature');
    }
}

module.exports = {
    InstanceDecoder,
    InvalidSignature
}
