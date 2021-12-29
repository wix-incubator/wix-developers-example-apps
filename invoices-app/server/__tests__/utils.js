const crypto = require('crypto');

const randomString = () => crypto.randomBytes(32).toString('base64')
const randomUrl = () => `https://${randomString()}`;
const randomObject = () => Object.assign({}, ...(new Array(10).fill(0).map(() => ({[randomString()]: randomString()}))))
const randomPort = () => 10000 + Math.floor(Math.random() * 55000);

module.exports = {randomString, randomUrl, randomObject, randomPort}
