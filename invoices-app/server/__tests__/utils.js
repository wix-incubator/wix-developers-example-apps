const crypto = require('crypto');

const randomString = () => crypto.randomBytes(32).toString('base64')
const randomUrl = () => `https://${randomString()}`;
const randomObject = () => Object.assign({}, ...(new Array(10).fill(0).map(() => ({[randomString()]: randomString()}))))

module.exports = {randomString, randomUrl, randomObject}
