const axios = require('axios');
const crypto = require('crypto');

class CouponsApis {

    constructor(baseUrl, refreshTokenDao, wixOAuthFacade) {
        this.refreshTokenDao = refreshTokenDao;
        this.wixOAuthFacade = wixOAuthFacade;
        this.baseUrl = baseUrl;
    }

    async createCoupon(instanceId, productId, discountPercentage) {
        const refreshToken = await this.refreshTokenDao.getBy(instanceId);
        const { accessToken } = await this.wixOAuthFacade.getFreshAccessToken(refreshToken);

        const specification = this.generateCoupon(productId, discountPercentage);
        const res = await axios.post(`${this.baseUrl}/coupons`, specification, { headers: { authorization: accessToken } })

        return specification.specification
    }

    generateCoupon(productId, discountPercentage) {
        const now = new Date();
        const tomorrowInMs = now.getTime() + 86400000
        return {
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
                        entityId: productId
                    }
                },
                limitedToOneItem: true,
                percentOffRate: discountPercentage
            }
        };
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
