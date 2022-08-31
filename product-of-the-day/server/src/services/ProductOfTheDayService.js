class ProductOfTheDayService {

    constructor(ProductOfTheDayDao, wixInboxApis, couponsApis, storesApis, appId, couponsDao) {
        this.productOfTheDayDao = ProductOfTheDayDao;
        this.couponsApis = couponsApis;
        this.wixInboxApis = wixInboxApis;
        this.storesApis = storesApis;
        this.couponsDao = couponsDao;
        this.appId = appId
    }

    async saveProductOfTheDay(instanceId, productId, discountPercentage) {
        this.productOfTheDayDao.saveProductOfTheDay(instanceId, productId, discountPercentage)
    }

    async getProductOfTheDay(instanceId) {
        return this.productOfTheDayDao.getBy(instanceId);
    }

    async sendCouponOfTheDay(instanceId, participantId) {
        const productOfTheDayData = await this.productOfTheDayDao.getBy(instanceId)
        const result = await this.wixInboxApis.getConversation(instanceId, participantId)
        const conversationId = result?.conversation?.id
        const query = {"filter":`{\"id\": {\"$eq\": \"${productOfTheDayData.productId}\"}}`}
        const [productData, couponData] = await Promise.all([
            this.storesApis.queryProducts(instanceId, query),
            this.couponsApis.createCoupon(instanceId, productOfTheDayData.productId, productOfTheDayData.discountPercentage)
        ])
        const message = this.generateCouponMessage(conversationId, couponData, productData, productOfTheDayData.discountPercentage)
        console.log('sending coupon...');
        return this.wixInboxApis.sendMessage(instanceId, message)
    }

    generateCouponMessage(conversationId, couponData, productData, discountPercentage) {
        
        return {
            "conversation_id": conversationId,
            "typing_delay": 0,
            "send_as": this.appId,
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
