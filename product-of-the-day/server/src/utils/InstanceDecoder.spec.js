const {InstanceDecoder, InvalidSignature} = require("./InstanceDecoder");
const crypto = require('crypto');

describe('InstanceDecoder', () => {

    const someSecret = 'c8175096-0c39-4adc-9c93-2eccf3c9f6d5';
    const data = {
        "instanceId": "aaaa",
        "appDefId": "bbebb",
        "signDate": "2021-12-27T11:52:00.639Z",
        "uid": "aaaa",
        "permissions": "OWNER",
        "demoMode": false,
        "siteOwnerId": "aaaa",
        "siteMemberId": "bbbb",
        "expirationDate": "2021-12-27T15:52:00.639Z",
        "loginAccountId": "aaaa"
    }
    const validSignature = `Dvlh7TlxkfER9776elfBYTLr-4Xh7xJUq2xRzmki42U`;
    const invalidSignature = crypto.randomBytes(32).toString('base64');
    const dataAsBase64 = Buffer.from(JSON.stringify(data), 'utf8').toString('base64');
    const instanceSignedWithSecret = `${validSignature}.${dataAsBase64}`
    const instanceWithRandomSignature = `${invalidSignature}.${dataAsBase64}`

    it('should return parsed instance when signature is valid - with static instance', () => {
        const decoder = new InstanceDecoder(someSecret);
        expect(decoder.decodeOrThrow(instanceSignedWithSecret)).toEqual(data)
    });

    it('should throw an error when the signature is invalid', () => {
        const decoder = new InstanceDecoder(someSecret);
        expect(() => decoder.decodeOrThrow(instanceWithRandomSignature)).toThrow(InvalidSignature)
    });

})
