const axios = require('axios');

class CouponsApis {

    constructor(baseUrl, refreshTokenDao, wixOAuthFacade, productOfTheDayDao, discountPercentage, couponCode) {
        this.refreshTokenDao = refreshTokenDao;
        this.wixOAuthFacade = wixOAuthFacade;
        this.baseUrl = baseUrl;
        this.discountPercentage = discountPercentage;
        this.couponCode = couponCode;
        this.productOfTheDayDao = productOfTheDayDao;
    }

    async createCoupon(instanceId, specification) {
        const refreshToken = await this.refreshTokenDao.getBy(instanceId);
        
        const { accessToken } = await this.wixOAuthFacade.getFreshAccessToken(refreshToken);
        
        const productOfTheDay = await this.productOfTheDayDao.get();

        const specification = {
            specification: {
                name: "ProductOfTheDayDiscount",
                code: this.couponCode,
                startTime: Date.now(),
                limitedToOneItem: false,
                appliesToSubscriptions: false,
                scope: {
                    namespace: 'stores',
                    group: {
                        name: 'product',
                        entityId: productOfTheDay
                    }
                },
                percentOffRate: discountPercentage
            }
        }
        const res = await axios.post(`${this.baseUrl}/v2/coupons`, specification, { headers: { authorization: accessToken } })
        
        return res.data.id
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
