const { FileBasedProductOfTheDayDao } = require("./FileBasedProductOfTheDayDao");
const { randomString } = require("../../__tests__/utils");

describe('FileBasedProductOfTheDayDao', () => {

    it('should store product of the day and discount Percentage by instanceId and allow to fetch them, ', async () => {
        const dao = new FileBasedProductOfTheDayDao();
        const instanceId = randomString();
        const productId = randomString();
        const discountPercentage = 10;
        await dao.savePorductOfTheDay(instanceId, productId, discountPercentage);
        await expect(dao.getBy(instanceId)).resolves.toEqual({"productId": productId,  "discountPercentage": 10})
    })

    it('should return null when the instanceId does not exist in the store', async () => {
        const dao = new FileBasedProductOfTheDayDao();
        await expect(dao.getBy(randomString())).resolves.toBeUndefined();
    })

})