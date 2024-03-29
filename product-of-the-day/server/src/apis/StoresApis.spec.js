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

    const givenProducts = (accessToken, queryResult) =>
        nock(baseUrl, {reqheaders: {authorization: accessToken}}).post('/v1/products/query').reply(200, queryResult)

    it('should get the refresh token, get a fresh access token and finally call wix to get products', async () => {
        const storesApis = storesApisInstance();
        const queryResult = randomObject();
        givenRefreshTokenFor(instanceId, refreshToken);
        givenAccessToken(refreshToken, accessToken);
        givenProducts(accessToken, queryResult)
        await expect(storesApis.queryProducts(instanceId, {})).resolves.toEqual(queryResult)
    })


})
