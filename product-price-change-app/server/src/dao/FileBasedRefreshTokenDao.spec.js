const {InMemoryRefreshTokenDao} = require("./InMemoryRefreshTokenDao");
const {randomString} = require("../../__tests__/utils");

describe('InMemoryRefreshTokenDao', () => {

    it('should store refreshTokens by instanceId, and allow fetching them', async () => {
        const dao = new InMemoryRefreshTokenDao();
        const instanceId = randomString();
        const refreshToken = randomString();
        await dao.save(instanceId, refreshToken);
        await expect(dao.getBy(instanceId)).resolves.toEqual(refreshToken)
    })

    it('should return null when the instanceId does not exist in the store', async () => {
        const dao = new InMemoryRefreshTokenDao();
        await expect(dao.getBy(randomString())).resolves.toBeUndefined();
    })

})
