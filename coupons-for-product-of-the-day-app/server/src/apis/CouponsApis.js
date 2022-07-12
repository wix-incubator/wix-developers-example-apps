const axios = require('axios');
const crypto = require('crypto');

class CouponsApis {

    constructor(baseUrl, refreshTokenDao, wixOAuthFacade, productOfTheDayDao) {
        this.refreshTokenDao = refreshTokenDao;
        this.wixOAuthFacade = wixOAuthFacade;
        this.baseUrl = baseUrl;
        this.productOfTheDayDao = productOfTheDayDao;
    }

    async createCoupon(instanceId) {
        const refreshToken = await this.refreshTokenDao.getBy(instanceId);

        const { accessToken } = await this.wixOAuthFacade.getFreshAccessToken(refreshToken);

        const productOfTheDayObject = await this.productOfTheDayDao.getBy(instanceId);
        const now = new Date();
        const tomorrowInMs =  now.getTime() + 86400000
        const specification = {
            specification: {
                name: "ProductOfTheDay",
                code: crypto.randomBytes(12).toString('base64'),
                active: true,
                startTime: now.getTime(),
                usageLimit: 1,
                expirationTime: tomorrowInMs,
                scope: {
                  namespace: "stores",
                  group: {
                    name: "product",
                    entityId: productOfTheDayObject.productId
                  }
                },
                limitedToOneItem: true,
                percentOffRate: productOfTheDayObject.discountPercentage
              }
        }
        const res = await axios.post(`${this.baseUrl}/v2/coupons`, specification, { headers: { authorization: accessToken } })

        return res.data
    }

    async getCoupon(instanceId, couponId) {
        const refreshToken = await this.refreshTokenDao.getBy(instanceId);

        const { accessToken } = await this.wixOAuthFacade.getFreshAccessToken(refreshToken);

        const res = await axios.get(`${this.baseUrl}/v2/coupons/${couponId}`, {}, { headers: { authorization: accessToken } })

        return res.data.coupon
    }
}

module.exports = {
    CouponsApis
}
