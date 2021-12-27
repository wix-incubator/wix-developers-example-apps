const axios = require('axios');
const { DB } = require('./DB');
const requestManager = require('./requestManager');

const { getAccessTokenFromWix } = requestManager;

module.exports.getSiteInfo = async function getSiteInfo(refreshToken) {
    const { access_token } = await getAccessTokenFromWix(refreshToken);
    const { data } = await axios.get('https://www.wixapis.com/apps/v1/instance', {
        headers: {
            Authorization: `${access_token}`,
        },
    });
    return data;
};



module.exports.getSiteOrders = async function getTotalContact(refreshToken) {
    const { access_token } = await getAccessTokenFromWix(refreshToken);
    const url = `https://www.wixapis.com/stores/v2/orders/query`;
    const { data } = await axios.post(url, {}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${access_token}`
        }
    })
    return data
}
