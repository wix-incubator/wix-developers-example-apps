const {randomString, randomObject} = require("../../__tests__/utils");
const {InMemoryAppInstallationsDao} = require("./InMemoryAppInstallationsDao");

describe('InMemoryAppInstallationsDao', () => {

    it('should store refreshTokens by instanceId, and allow fetching them', async () => {
        const dao = new InMemoryAppInstallationsDao();
        const instanceId = randomString();
        const data = randomObject();
        await dao.save(instanceId, data);
        await expect(dao.getBy(instanceId)).resolves.toEqual(data)
    })

    it('should return null when the instanceId does not exist in the store', async () => {
        const dao = new InMemoryAppInstallationsDao();
        await expect(dao.getBy(randomString())).resolves.toBeUndefined();
    })

})
