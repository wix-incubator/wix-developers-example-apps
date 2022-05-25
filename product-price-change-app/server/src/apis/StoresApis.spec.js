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
const {StoresApis} = require("./StoresApis");


describe('StoresApis', () => {
    const baseUrl = randomUrl();
    const storesApisInstance = () => new StoresApis(baseUrl, refreshTokenDao, wixOAuthFacade);

    const givenInstance = (accessToken, queryResult) =>
        nock(baseUrl, {reqheaders: {authorization: accessToken}}).post('/orders/query').reply(200, queryResult)

    it('should get the refresh token, get a fresh access token and finally call wix to get orders', async () => {
        const storesApis = storesApisInstance();
        const queryResult = randomObject();
        givenRefreshTokenFor(instanceId, refreshToken);
        givenAccessToken(refreshToken, accessToken);
        givenInstance(accessToken, queryResult)
        await expect(storesApis.queryOrders(instanceId, {})).resolves.toEqual(queryResult)
    })


})
