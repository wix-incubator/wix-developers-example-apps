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
const {CouponsApis} = require("./CouponsApis");
const {ProductOfTheDay} = require("../dao/FileBasedProductOfTheDayDao");

describe('CouponsApis', () => {
    const baseUrl = randomUrl();
    const couponsApisInstance = () => new CouponsApis(baseUrl, refreshTokenDao, wixOAuthFacade);

    const givenInstance = (accessToken, createCouponResult) =>
        nock(baseUrl, {reqheaders: {authorization: accessToken}}).post('/v2/coupons').reply(200, createCouponResult)

    it('should get the refresh token, get a fresh access token and finally call wix to create coupon', async () => {
        const couponsApis = couponsApisInstance();
        const createCouponResult = randomObject();
        givenRefreshTokenFor(instanceId, refreshToken);
        givenAccessToken(refreshToken, accessToken);
        givenInstance(accessToken, createCouponResult);
        await expect(couponsApis.createCoupon(instanceId, {})).resolves.toEqual(createCouponResult);
    })


})
