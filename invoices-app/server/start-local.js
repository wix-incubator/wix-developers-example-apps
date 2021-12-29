require('dotenv').config();
const localtunnel = require('localtunnel');
const {startServer} = require('./src/app');

(async () => {
    const {APP_ID, APP_SECRET, WEBHOOK_PUBLIC_KEY} = process.env;
    const appUrl = `https://${process.env.APP_ID}.loca.lt/auth/app-wix`
    const redirectUrl = `https://${process.env.APP_ID}.loca.lt/auth/redirect-wix`
    const wixBaseUrl = 'https://www.wix.com';
    const config = {APP_ID, APP_SECRET, port: 8080, appUrl, redirectUrl, wixBaseUrl, WEBHOOK_PUBLIC_KEY};
    await localtunnel({port: config.port, subdomain: process.env.APP_ID});
    console.log(`Local server running on port 8080
AppUrl: ${appUrl}   
RedirectUrl: ${redirectUrl}    
`)

    const app = startServer(config)
    app.listen(config.port);
})();
