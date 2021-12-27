const axios = require('axios');

const oauthPath = `https://www.wix.com/oauth/access`;

const {
  APP_ID,
  APP_SECRET
} = process.env;

exports.getTokensFromWix = (code) =>
  axios
    .post(oauthPath, {
      code: code,
      client_secret: `${APP_SECRET}`,
      client_id: `${APP_ID}`,
      grant_type: 'authorization_code',
    })
    .then(res => res.data).catch((error) => { console.error(error) });

exports.getAccessTokenFromWix = (refreshToken) =>
  axios
    .post(oauthPath, {
      refresh_token: refreshToken,
      client_secret: `${APP_SECRET}`,
      client_id: `${APP_ID}`,
      grant_type: 'refresh_token',
    })
    .then(resp => resp.data)
    .catch((error) => { console.error("getAccessTokenFromWix::ERROR::", error) });;
