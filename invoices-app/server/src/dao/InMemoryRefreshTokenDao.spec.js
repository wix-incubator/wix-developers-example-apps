const {InMemoryRefreshTokenDao} = require("./InMemoryRefreshTokenDao");
const {randomString} = require("../../__tests__/utils");

describe('InMemoryRefreshTokenDao', () => {

    it('should store refreshTokens by instanceId, and allow fetching them', () => {
        const dao = new InMemoryRefreshTokenDao();
        const instanceId = randomString();
        const refreshToken = randomString();
        dao.save(instanceId, refreshToken);
        expect(dao.getBy(instanceId)).toEqual(refreshToken)
    })

    it('should return null when the instanceId does not exist in the store', async () => {
        const dao = new InMemoryRefreshTokenDao();
        expect(dao.getBy(randomString())).toBeNull();
    })

})
