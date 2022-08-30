const {randomString} = require("../utils");

let appId = randomString();
let appSecret = randomString();
let refreshToken = randomString();
let instanceId = randomString();

beforeEach(() => {
    appId = randomString();
    appSecret = randomString();
    refreshToken = randomString();
    instanceId = randomString();
})
