const {mock, instance, when} = require('ts-mockito');
const {ProductOfTheDayDao} = require("../../../src/dao/ProductOfTheDayDao");
const {randomString, randomInt} = require("../../utils");


const productOfTheDayDaoMock = mock(ProductOfTheDayDao);

let instanceId = randomString();
let productId = randomString();
let discountPercentage = randomInt(30);
let productOfTheDayDao = instance(productOfTheDayDaoMock);

beforeEach(() => {
    instanceId = randomString();
    productId = randomString();
    discountPercentage = randomInt(30);
    productOfTheDayDao = instance(productOfTheDayDaoMock);
})

const givenProductOfTheDayAndDiscountFor = (instanceId, productId, discountPercentage) =>
    when(productOfTheDayDaoMock.getBy(instanceId)).thenResolve({instanceId, productId, discountPercentage})

module.exports = {
    productOfTheDayDao,
    productId,
    instanceId,
    discountPercentage,
    givenProductOfTheDayAndDiscountFor
}
