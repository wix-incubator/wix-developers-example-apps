const crypto = require('crypto');

const randomString = () => crypto.randomBytes(32).toString('base64')


module.exports = {randomString}
