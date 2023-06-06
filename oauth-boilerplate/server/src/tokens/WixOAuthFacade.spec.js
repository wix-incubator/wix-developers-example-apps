const {WixOAuthFacade} = require("./WixOAuthFacade");
const nock = require('nock');
const {randomString} = require("../../__tests__/utils");
const {appId, appSecret, refreshToken} = require('../../__tests__/drivers/defaultTenants');

describe('WixOAuthFacade', () => {

    const baseUrl = `http://${randomString()}`;
    const wixOAuthFacade = new WixOAuthFacade( appId, appSecret, baseUrl);

    const givenTokensFromAuthCode = (forCode, refreshToken, accessToken) => {
        nock(baseUrl).post('/oauth/access', {
            code: forCode,
            client_secret: appSecret,
            client_id: appId,
            grant_type: 'authorization_code'
        }).reply(200, {access_token: accessToken, refresh_token: refreshToken})
    }
   const givenTokensFromRefresh = (refreshToken, accessToken) => {
        nock(baseUrl).post('/oauth/access', {
            refresh_token: refreshToken,
            client_secret: appSecret,
            client_id: appId,
            grant_type: 'refresh_token'
        }).reply(200, {access_token: accessToken})
    }


    it('should return tokens given authorization code', async () => {
        const code = randomString();
        const accessToken = randomString();
        givenTokensFromAuthCode(code, refreshToken, accessToken);
        await expect(wixOAuthFacade.getTokensFrom(code)).resolves.toEqual({accessToken, refreshToken});
    });

    it('should return tokens given refresh token', async () => {
        const accessToken = randomString();
        givenTokensFromRefresh(refreshToken, accessToken);
        await expect(wixOAuthFacade.getFreshAccessToken(refreshToken)).resolves.toEqual({accessToken});
    });

})
