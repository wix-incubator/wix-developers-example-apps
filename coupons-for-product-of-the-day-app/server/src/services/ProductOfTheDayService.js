class ProductOfTheDayService {

    constructor(fileBasedAppInstallationsDao, wixInboxApis, couponsApis, storesApis, appId) {
        this.fileBasedAppInstallationsDao = fileBasedAppInstallationsDao;
        this.couponsApis = couponsApis;
        this.wixInboxApis = wixInboxApis;
        this.storesApis = storesApis;
    }

    async saveProductOfTheDay(instanceId, productId, discountPercentage) {
        this.fileBasedAppInstallationsDao.saveProductOfTheDay(instanceId, productId, discountPercentage)
    }

    async getProductOfTheDay(instanceId) {
        return this.fileBasedAppInstallationsDao.getBy(instanceId);
    }

    async sendCouponOfTheDay(instanceId, conversationId) {
        const productOfTheDayData = await this.fileBasedAppInstallationsDao.getBy(instanceId)
        const query = {"filter":`{\"id\": {\"$eq\": \"${productOfTheDayData.productId}\"}}`}
        const [productData, couponData] = await Promise.all([
            this.storesApis.queryProducts(instanceId, query),
            this.couponsApis.createCoupon(instanceId, productOfTheDayData.productId, productOfTheDayData.discountPercentage)
        ])
        const message = this.generateCouponMessage(conversationId, couponData, productData, "appId", productOfTheDayData.discountPercentage)
        return this.wixInboxApis.sendMessage(instanceId, message)
    }

    generateCouponMessage(conversationId, couponData, productData, appId, discountPercentage) {

        return {
            "conversation_id": conversationId,
            "typing_delay": 0,
            "send_as": appId,
            "message": {
                "target_channels": [
                    "CHAT"
                ],
                "content": {
                    "preview_text": "A coupon of the day",
                    "basic": {
                        "items": [
                            {
                                "text": `Hi,
                                        Thanks for your message – we'll be right with you.
                                        In the meantime, take a look at our 'Product of the Day': ${productData[0].name}
                                        Buy today and you'll get an exclusive ${discountPercentage}% discount.
                                        Use ${couponData.code} at checkout.
                                        ${productData[0].productPageUrl.base}${productData[0].productPageUrl.path}`
                            },
                            {
                               "image": {"url": productData[0].media.mainMedia.image.url, "width": 100,  "height": 100}
                            }
                        ]
                    },
                    "title":"A coupon of the day"
                },
                "source_channel": "CHAT",
                "visibility": "BUSINESS_AND_PARTICIPANT",
                "direction": "BUSINESS_TO_PARTICIPANT"
            }
        }
    }

}

module.exports = {
    ProductOfTheDayService
}
