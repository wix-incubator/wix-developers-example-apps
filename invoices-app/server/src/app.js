require('dotenv').config();
const express = require('express');
const crypto = require('crypto');
const cors = require('cors');
const { getSiteInfo, getSiteOrders } = require('./wixApi');
const requestManager = require('./requestManager');
const { DB } = require('./DB');

const app = express();

const port = process.env.PORT || 8080;

/*
  APP_ID and APP_SECRET are secrets and you shouldn't share them with anyone!
  Their values resides in .env file and yous should NOT COMMIT THEM TO GITHUB!
*/
const { APP_ID, APP_SECRET } = process.env;
const { getTokensFromWix } = requestManager;

app.use(cors());

//this route is the app-url you add to your App in wix dev center
app.get('/api/app-wix', (req, res) => {
  res.redirect(
    `https://www.wix.com/app-oauth-installation/consent?token=${req.query.token}&state=start&appId=${APP_ID}&redirectUrl=${WIX_REDIRECT_URL}`
  );
});


app.get('/', async (req, res) => {
  res.send(DB.list())
})
//Wix will redirect here after user consent the app
app.get(`/api/redirect-wix`, async (req, res) => {
  //wix instance Id of the app installation on site.
  const instanceId = req.query.instanceId;

  const { refresh_token } = await getTokensFromWix(req.query.code);

  DB.saveWixToken(instanceId, refresh_token);

  res.redirect('https://www.wix.com/app-oauth-installation/token-received');
});

app.get('/api/test', (req, res) => {
  res.json({ status: 'ok' });
});

function verifyInstance(instance, secret) {
  const pair = instance.split('.');
  const signature = decode(pair[0], 'binary');
  const data = pair[1];

  // sign the data using hmac-sha1-256
  const hmac = crypto.createHmac('sha256', secret);
  const newSignature = hmac.update(data).digest('binary');

  return signature === newSignature;
}

function decode(data, encoding) {
  encoding = encoding === undefined ? 'utf8' : encoding;
  const buf = Buffer.from(data.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
  return encoding ? buf.toString(encoding) : buf;
}

app.get('/api/dashboard', async (req, res) => {
  const instance = req.query.instance;
  if (verifyInstance(instance, APP_SECRET)) {
    const pair = instance.split('.');
    const data = pair[1];
    const dataJson = JSON.parse(decode(data, 'binary'));
    const { wixRefreshToken } = DB.getApiTokenByInstanceId(
      dataJson.instanceId
    );

    const [siteInfo, siteOrders] = await Promise.all([getSiteInfo(wixRefreshToken), getSiteOrders(wixRefreshToken)]);

    res.json({ dataJson, siteInfo, siteOrders });
  } else {
    res.json('error verifyInstance');
  }
});

app.listen(port, function () {
  console.log(`Example Wix Oauth app listening on ${port}!`);
});
