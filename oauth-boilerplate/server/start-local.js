require('dotenv').config();
const {startServer, createControlers} = require('./src/app');
const fs = require("fs");


async function start() {
    
    const app = startServer()
    const port = 8080
    const {APP_ID, APP_SECRET, WEBHOOK_PUBLIC_KEY, URL} = process.env;
    app.listen(port);
    
    const wixBaseUrl = 'https://www.wix.com';
    const wixApiUrl = 'https://www.wixapis.com/';


    const appUrl = `${URL}/auth/app-wix`
    const redirectUrl = `${URL}/auth/redirect-wix`;
    const installedWebhook = `${URL}/webhooks/app-installed`;
    const removedWebhook = `${URL}/webhooks/app-removed`;
    const purchasedWebhook = `${URL}/webhooks/plan-purchased`;
    const apiTestLink = `${URL}/api/test`;
    const dashbaordLink = `${URL}/api/dashboard`;
  

    console.log(`Local server running on port ${port}
RedirectUrl: ${redirectUrl}
AppUrl: ${appUrl}
app installed webhook: ${installedWebhook}
app purchased webhook: ${purchasedWebhook}
app removed Webhook: ${removedWebhook}
app dashboard link: ${dashbaordLink}
API test link: ${apiTestLink}
`)

    const config = {APP_ID, APP_SECRET, port: port, appUrl, redirectUrl, wixBaseUrl, WEBHOOK_PUBLIC_KEY, wixApiUrl};
    
    createControlers(app, config);

    console.log('Server started!');
}
start();
