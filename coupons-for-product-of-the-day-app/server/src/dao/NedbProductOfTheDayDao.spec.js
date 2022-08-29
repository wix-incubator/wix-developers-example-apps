const { randomString } = require("../../__tests__/utils");
const { NedbProductOfTheDayDao } = require("./NedbProductOfTheDayDao");

describe('NedbProductOfTheDayDao', () => {

    it('should store product of the day and discount Percentage by instanceId and allow to fetch them, ', async () => {
        const dao = new NedbProductOfTheDayDao();
        const instanceId = randomString();
        const productId = randomString();
        const discountPercentage = 10;
        await dao.saveProductOfTheDay(instanceId, productId, discountPercentage);
        await expect(dao.getBy(instanceId)).resolves.toEqual (expect.objectContaining({"instanceId": instanceId, "productId": productId,  "discountPercentage": 10}))
    })

    it('should return null when the instanceId does not exist in the store', async () => {
        const dao = new NedbProductOfTheDayDao();
        await expect(dao.getBy(randomString())).resolves.toEqual(null);
    })

})
