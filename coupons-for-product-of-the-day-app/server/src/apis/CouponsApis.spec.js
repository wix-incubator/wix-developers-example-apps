const {
    refreshTokenDao,
    refreshToken,
    instanceId,
    givenRefreshTokenFor
} = require("../../__tests__/drivers/dao/RefreshTokenDaoTestSupport");

const {
    productOfTheDayDao,
    productId,
    discountPercentage,
    givenProductOfTheDayAndDiscountFor
} = require("../../__tests__/drivers/dao/ProductOfTheDayDaoTestSupport");
const {
    wixOAuthFacade,
    givenAccessToken,
    accessToken
} = require("../../__tests__/drivers/tokens/WixOAuthFacadeTestSupport");
const nock = require('nock');
const {randomUrl, randomObject} = require("../../__tests__/utils");
const {CouponsApis} = require("./CouponsApis");
const _ = require('lodash');


describe('CouponsApis', () => {
    const baseUrl = randomUrl();
    const couponsApisInstance = () => new CouponsApis(baseUrl, refreshTokenDao, wixOAuthFacade, productOfTheDayDao);

    const givenInstance = (accessToken, createCouponResult) =>
        nock(baseUrl, {reqheaders: {authorization: accessToken}}).post('/v2/coupons',  _.matches({ body: "" })).reply(200, createCouponResult)

    it('should get the refresh token, get a fresh access token and finally call wix to create coupon', async () => {
        const couponsApis = couponsApisInstance();
        const createCouponResult = randomObject();
        givenRefreshTokenFor(instanceId, refreshToken);
        givenAccessToken(refreshToken, accessToken);
        givenInstance(accessToken, createCouponResult);
        givenProductOfTheDayAndDiscountFor(instanceId, productId, discountPercentage)
        await expect(couponsApis.createCoupon(instanceId, productId, discountPercentage)).resolves.toEqual(createCouponResult);
    })


})
