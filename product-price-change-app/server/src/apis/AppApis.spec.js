const {AppApis} = require("./AppApis");
const {
    refreshTokenDao,
    refreshToken,
    instanceId,
    givenRefreshTokenFor
} = require("../../__tests__/drivers/dao/RefreshTokenDaoTestSupport");
const {
    wixOAuthFacade,
    givenAccessToken,
    accessToken
} = require("../../__tests__/drivers/tokens/WixOAuthFacadeTestSupport");
const nock = require('nock');
const {randomUrl, randomObject} = require("../../__tests__/utils");


describe('AppApis', () => {
    const baseUrl = randomUrl();
    const appApisInstance = () => new AppApis(baseUrl, refreshTokenDao, wixOAuthFacade);

    const givenInstance = (accessToken, instanceResult) =>
        nock(baseUrl, {reqheaders: {authorization: accessToken}}).get('/instance').reply(200, instanceResult)

    it('should get the refresh token, get a fresh access token and finally call wix', async () => {
        const appApis = appApisInstance();
        const instanceResult = randomObject();
        givenRefreshTokenFor(instanceId, refreshToken);
        givenAccessToken(refreshToken, accessToken);
        givenInstance(accessToken, instanceResult);
        await expect(appApis.getAppInstance(instanceId)).resolves.toEqual(instanceResult);
    });


})
