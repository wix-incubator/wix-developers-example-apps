const axios = require('axios');
const fs = require('fs/promises');

class CouponsApis {

    constructor(baseUrl, refreshTokenDao, wixOAuthFacade, databasePath) {
        this.refreshTokenDao = refreshTokenDao;
        this.wixOAuthFacade = wixOAuthFacade;
        this.baseUrl = baseUrl;
        this.databasePath = databasePath;
    }

    async createCoupon(instanceId, specification) {
        const refreshToken = await this.refreshTokenDao.getBy(instanceId);
        
        const { accessToken } = await this.wixOAuthFacade.getFreshAccessToken(refreshToken);
        
        try {
            const productOfTheDay = await fs.readFile(this.databasePath, { encoding: 'utf8' });
        } catch (err) {
            console.error(err);
            return;
        }

        const specification = {
            specification: {
                scope: {
                    namespace: 'stores',
                    group: {
                        name: product,
                        entityId: productOfTheDay
                    }
                }
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
