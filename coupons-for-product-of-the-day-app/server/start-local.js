require('dotenv').config();
const mytunnel = require('mytunnel');
const {startServer} = require('./src/app');


const startTunnel = async () => {
    const {APP_ID, APP_SECRET, WEBHOOK_PUBLIC_KEY} = process.env;
    const baseUrl = `https://${process.env.APP_ID}.tobuyornot.com`;
    const appUrl = `${baseUrl}/auth/app-wix`
    const redirectUrl = `${baseUrl}/auth/redirect-wix`;
    const installedWebhook = `${baseUrl}/webhooks/app-installed`;
    const removedWebhook = `${baseUrl}/webhooks/app-removed`;
    const purchasedWebhook = `${baseUrl}/webhooks/plan-purchased`;
    const inboxWebhook = `${baseUrl}/webhooks/inbox`;
    const wixBaseUrl = 'https://www.wix.com';
    const wixApiUrl = 'https://www.wixapis.com';
    const hostTunnel = 'http://tobuyornot.com'
    const config = {APP_ID, APP_SECRET, port: 8080, appUrl, redirectUrl, wixBaseUrl, WEBHOOK_PUBLIC_KEY, wixApiUrl, hostTunnel};
    await mytunnel({host: config.hostTunnel, port: config.port, subdomain: process.env.APP_ID});

    console.log(`Local server running on port 8080
AppUrl: ${appUrl}   
RedirectUrl: ${redirectUrl}    
App Installed webhook: ${installedWebhook}
App removed webhook: ${removedWebhook}
App upgraded webhook: ${purchasedWebhook}
Message received webhook: ${inboxWebhook}
`)

    const app = startServer(config)
    app.listen(config.port);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function start() {
    console.log('Server will start soon connecting to local tunnel...');
    //sleep since on restart server the subdomain address needs to be released before we can reconnect
    await sleep( 5000);
    startTunnel()
    console.log('Server started!');
}
start();
