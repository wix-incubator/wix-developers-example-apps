require('dotenv').config();
const express = require('express');
const {getSiteInfo, getSiteOrders} = require('./wixApi');
const {InstanceDecoder} = require("./utils/InstanceDecoder");

const {InMemoryRefreshTokenDao} = require("./dao/InMemoryRefreshTokenDao");
const {WixOAuthFacade} = require("./tokens/WixOAuthFacade");

const app = express();

const port = process.env.PORT || 8080;

/*
  APP_ID and APP_SECRET are secrets and you shouldn't share them with anyone!
  Their values resides in .env file and yous should NOT COMMIT THEM TO GITHUB!
*/
const {APP_ID, APP_SECRET} = process.env;
const instanceDecoder = new InstanceDecoder(APP_SECRET);
const refreshTokenDao = new InMemoryRefreshTokenDao();
const wixOAuthFacade = new WixOAuthFacade('https://www.wix.com', APP_ID, APP_SECRET);

const tokenReceivedEndpoint = 'https://www.wix.com/installer/token-received';
const getInstallUrl = token =>
    `https://www.wix.com/installer/install?token=${token}&state=start&appId=${APP_ID}&redirectUrl=http://localhost:8080/auth/redirect-wix`;

//this route is the app-url you add to your App in wix dev center
app.get('/auth/app-wix', (req, res) => {
    res.redirect(getInstallUrl(req.query.token));
});

//Wix will redirect here after user consent the app
app.get(`/auth/redirect-wix`, async (req, res) => {
    //wix instance Id of the app installation on site.
    const {refresh_token} = await wixOAuthFacade.getTokensFrom(req.query.code);
    await refreshTokenDao.save(req.query.instanceId, refresh_token);
    res.redirect(tokenReceivedEndpoint);
});

app.get('/api/dashboard', async (req, res) => {
    const parsedInstance = instanceDecoder.decodeOrThrow(req.query.instance);
    const wixRefreshToken = refreshTokenDao.getBy(parsedInstance.instanceId);
    const [siteInfo, siteOrders] = await Promise.all([getSiteInfo(wixRefreshToken), getSiteOrders(wixRefreshToken)]);

    res.json({parsedInstance, siteInfo, siteOrders});
});

app.listen(port, function () {
    console.log(`Example Wix Oauth app listening on ${port}!`);
});
