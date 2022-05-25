const {WebhookDecoderVerifier} = require("./WebhookDecoderVerifier");
describe('WebhookDecoderVerifier', () => {

    const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjUtCVyLGf8M0+qlYWrJv
NYXpCwV2viCFuf4TJcdxoocZT0GOghRA0q9tYko5Rt4uJXARwn3khou9qKnZYC1+
7+81HY3JSoY9Hc5FILrYuxhkdYEDwKd2A27x4k4MLlEV9YlU2Vugr3oGE3+smuNl
6RhPn7gHvdK7cK9Ss1cZIg+icNPjUD+tHiDa4tn4I8uJOQqvA+PNXok3AntDZvYD
ETlQctvZVLV5cNvP81JdYOf4huItqoZkATtXwJE8Cm0cvu9vm0IqZCn4KHxjTnBk
CMY5DcX4T+CyW9klcdmWINxGRQI8VAHORuvGi2gKTK0zZvk7FZHOTjLfEMdgJ/uY
vwIDAQAB
-----END PUBLIC KEY-----`

    it('should verify jwt from webhook with public key, then decode', async () => {
        const expectedData = {
            "appId": "5bc2062d-010b-448c-a62a-d6bb269c5a4c",
            "originInstanceId": "07864c16-3a6f-4dd2-9973-028705762b2c"
        };
        const expectedDecoded = {
            instanceId: '3bbcabc7-ebb7-4fc8-8829-13ea0e142123',
            eventType: 'AppInstalled',
            data: expectedData
        }
        const webhook = `eyJraWQiOiJMR3VhcGtTRCIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiZGF0YVwiOlwie1xcXCJhcHBJZFxcXCI6XFxcIjViYzIwNjJkLTAxMGItNDQ4Yy1hNjJhLWQ2YmIyNjljNWE0Y1xcXCIsIFxcXCJvcmlnaW5JbnN0YW5jZUlkXFxcIjpcXFwiMDc4NjRjMTYtM2E2Zi00ZGQyLTk5NzMtMDI4NzA1NzYyYjJjXFxcIn1cIixcImluc3RhbmNlSWRcIjpcIjNiYmNhYmM3LWViYjctNGZjOC04ODI5LTEzZWEwZTE0MjEyM1wiLFwiZXZlbnRUeXBlXCI6XCJBcHBJbnN0YWxsZWRcIn0iLCJpYXQiOjE2NDA3ODg1NTQsImV4cCI6MTY0NDM4ODU1NH0.efOBeS4YXRIFUMOQ1x8AiHX50zrzdmSg3hU03dYFtsXdcf2S_lvu2VlnvxuesEFUoqLTh3ALnMs7gQpLPkCeLscWWOwW6sEuue3ONFFizB92YUDlQGjKAg4duykz37wbFrkak38Gp1k6ghGQGN7GXmoYHRFvHpXlVxONPRn9cgt4SSxVbR4po5aUpbDOjB8VkoUzbtQPiVW2Dv4-L8E4kQSXvbXuDhMwEHWyboFNRB1W7ayQS6_TiXoy4cTu-4PLMFh3Wfg8YnfEmmL56qXbWyutLfPs94gAT2--6vSqJzNhDoauj-nzCQESwAz2VeBeldI_GoVZFt6XFVhgynPwdg`;
        const decoderVerifier = new WebhookDecoderVerifier(publicKey);
        expect(decoderVerifier.verifyAndDecode(webhook)).toEqual(expectedDecoded)
    })
})
