const {WebhooksTestkit} = require("./WebhooksTestkit");
const {WebhookDecoderVerifier} = require("../../../src/utils/WebhookDecoderVerifier");
const {randomString, randomObject} = require("../../utils");


describe('WebhooksTestkit', () => {

    it('should create jwt exactly like webhooks are sending', () => {
        const testkit = new WebhooksTestkit();
        const verifier = new WebhookDecoderVerifier(testkit.publicKey);
        const instanceId = randomString();
        const eventType = randomString();
        const data = randomObject();
        const createdWebhook = testkit.createJWTForWebhook(instanceId, eventType, data);
        expect(verifier.verifyAndDecode(createdWebhook)).toEqual({instanceId, eventType, data})
    })

})
