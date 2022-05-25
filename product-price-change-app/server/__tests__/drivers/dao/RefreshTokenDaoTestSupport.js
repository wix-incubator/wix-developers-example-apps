const {mock, instance, when} = require('ts-mockito');
const {RefreshTokenDao} = require("../../../src/dao/RefreshTokenDao");
const {randomString} = require("../../utils");


const refreshTokenDaoMock = mock(RefreshTokenDao);

let instanceId = randomString();
let refreshToken = randomString();
let refreshTokenDao = instance(refreshTokenDaoMock);

beforeEach(() => {
    instanceId = randomString();
    refreshToken = randomString();
    refreshTokenDao = instance(refreshTokenDaoMock);
})

const givenRefreshTokenFor = (instanceId, refreshToken) =>
    when(refreshTokenDaoMock.getBy(instanceId)).thenResolve(refreshToken)

module.exports = {
    refreshTokenDao,
    refreshToken,
    instanceId,
    givenRefreshTokenFor
}
