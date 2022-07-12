const {v4: uuid} = require("uuid");
const {randomPort} = require("../utils");
const {WixOAuthTestkit} = require("../drivers/testkits/WixOAuthTestkit");
const axios = require("axios");
const {startServer} = require("../../src/app");
const {createServer} = require("http");
const {WebhooksTestkit} = require("../drivers/testkits/WebhooksTestkit");
const appId = uuid();
const appSecret = uuid();

const port = randomPort();
const oauthTestkit = new WixOAuthTestkit();
const webhooksTestkit = new WebhooksTestkit();
const axiosInstance = axios.create({baseURL: `http://localhost:${port}`});
const redirectUrl = `http://localhost:${port}/auth/redirect-wix`;



const startEnv = () => {

    let server;

    oauthTestkit.beforeAndAfter();
    beforeAll(async () => {
        const expressApp = startServer({
            APP_ID: appId,
            APP_SECRET: appSecret,
            port,
            redirectUrl: redirectUrl,
            wixBaseUrl: oauthTestkit.baseUrl,
            wixApiUrl: oauthTestkit.baseUrl,
            WEBHOOK_PUBLIC_KEY: webhooksTestkit.publicKey
        });
        server = createServer(expressApp);
        server.listen(port);
    });

    afterAll(() => {
        server.close()
    });
    return {
        axiosInstance,
        appId,
        appSecret,
        webhooksTestkit,
        oauthTestkit,
        redirectUrl
    }
}

module.exports = {startEnv}
