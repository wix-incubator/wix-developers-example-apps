const {
    refreshTokenDao,
    refreshToken,
    instanceId,
    givenRefreshTokenFor
} = require("../../__tests__/drivers/dao/RefreshTokenDaoTestSupport");
const {
    wixOAuthFacade,
    givenAccessToken,
    accessToken
} = require("../../__tests__/drivers/tokens/WixOAuthFacadeTestSupport");
const nock = require('nock');
const { randomUrl, randomObject } = require("../../__tests__/utils");
const { CashierApis } = require("./CashierApis");


describe('CashierApis', () => {
    const baseUrl = randomUrl();
    const cashierApisInstance = () => new CashierApis(baseUrl, refreshTokenDao, wixOAuthFacade);
    const randomTransactions = (length = Math.random() * 100) => Array.from({ length }, () => randomObject());


    const givenInstance = (accessToken, response) =>
        nock(baseUrl, { reqheaders: { authorization: accessToken } })
            .filteringPath(/offset=[^&]*/g, "offset=0")
            .get('/transactions?offset=0')
            .reply(200, response)

    it('should get the refresh token, get a fresh access token and finally call wix to get orders', async () => {
        const cashierApis = cashierApisInstance();
        const transactions = randomTransactions()
        const transactionsResponse = { pagination: { offset: 0, limit: 0, total: transactions.length }, transactions }
        givenRefreshTokenFor(instanceId, refreshToken);
        givenAccessToken(refreshToken, accessToken);
        givenInstance(accessToken, transactionsResponse)
        await expect(cashierApis.getPastTransactions(instanceId)).resolves.toEqual(transactions)
    })
})
