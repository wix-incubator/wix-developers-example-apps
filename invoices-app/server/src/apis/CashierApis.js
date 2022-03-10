const axios = require('axios');

class CashierApis {

    constructor(baseUrl, refreshTokenDao, wixOAuthFacade) {
        this.refreshTokenDao = refreshTokenDao;
        this.wixOAuthFacade = wixOAuthFacade;
        this.baseUrl = baseUrl;
        this.getPastTransactions = this.getPastTransactions.bind(this)
        this.accessTokenFor = this.accessTokenFor.bind(this)
        this.getTransactions = this.getTransactions.bind(this)
    }

    async accessTokenFor(instanceId) {
        const refreshToken = await this.refreshTokenDao.getBy(instanceId);
        const { accessToken } = await this.wixOAuthFacade.getFreshAccessToken(refreshToken);
        return accessToken
    }

    async getPastTransactions(instanceId) {
        let offset = 0
        const { transactions, pagination } = await this.getTransactions(instanceId, offset)
        let count = transactions.length
        while (count < pagination.total) {
            offset = count
            const nextTransactions = await this.getTransactions(instanceId, offset)
            count = transactions.push(nextTransactions.transactions)
        }
        return transactions
    }

    async getTransactions(instanceId, offset = 0) {
        const accessToken = await this.accessTokenFor(instanceId)
        const uri = `${this.baseUrl}/transactions`
        const { pagination, transactions } = await axios.get(`${this.baseUrl}/transactions?offset=${offset}`, { headers: { authorization: accessToken } }).then(r => r.data);
        return { pagination, transactions }
    }
}

module.exports = {
    CashierApis
}
