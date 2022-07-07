const { FileBasedRefreshTokenDao } = require("./FileBasedRefreshTokenDao");
const { randomString } = require("../../__tests__/utils");

describe('FileBasedRefreshTokenDao', () => {

    it('should store refreshTokens by instanceId, and allow fetching them', async () => {
        const dao = new FileBasedRefreshTokenDao();
        const instanceId = randomString();
        const refreshToken = randomString();
        await dao.save(instanceId, refreshToken);
        await expect(dao.getBy(instanceId)).resolves.toEqual(refreshToken)
    })

    it('should return null when the instanceId does not exist in the store', async () => {
        const dao = new FileBasedRefreshTokenDao();
        await expect(dao.getBy(randomString())).resolves.toBeUndefined();
    })

})
