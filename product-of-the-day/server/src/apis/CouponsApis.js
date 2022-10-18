const axios = require('axios').default;
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
        await axios.post(`${this.baseUrl}/coupons`, specification, { headers: { authorization: accessToken } })

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
}

module.exports = {
    CouponsApis
}
