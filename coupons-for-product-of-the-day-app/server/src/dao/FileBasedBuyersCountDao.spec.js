const { FileBasedBuyersCountDao } = require("./FileBasedBuyersCountDao");
const { randomString } = require("../../__tests__/utils");

describe('FileBasedBuyersCountDao', () => {

    it('should store refreshTokens by instanceId, and allow fetching them', async () => {
        const dao = new FileBasedBuyersCountDao();
        const instanceId = randomString();
        const refreshToken = randomString();
        await dao.save(instanceId, refreshToken);
        await expect(dao.getBy(instanceId)).resolves.toEqual(refreshToken)
    })

    it('should return 0 when the instanceId does not exist in the store', async () => {
        const dao = new FileBasedBuyersCountDao();
        await expect(dao.getBy(randomString())).resolves.toBeUndefined();
    })

})
