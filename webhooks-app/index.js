require('dotenv').config();
const express = require('express')
const localtunnel = require('localtunnel');
const {json, text} = require('body-parser');
const jwt = require('jsonwebtoken');



(async () => {
    console.log('starting');
    const port = 8080
    const {APP_ID, WEBHOOK_PUBLIC_KEY} = process.env;

    await localtunnel({port: port, subdomain: APP_ID});

    const baseUrl = `https://${APP_ID}.loca.lt`;
    const installedWebhook = `${baseUrl}/webhooks/app-installed`;

    console.log(`Local server running on port 8080 App Installed webhook: ${installedWebhook}`)
    const app = express();

    app.use(text());
    app.use(json());

    app.get('/health', (req, res) => {
        res.send('ok');
    })

    app.post('/webhooks/app-installed', (req, res) => {
        console.log(req.body)
        const decoded = jwt.verify(req.body, `${WEBHOOK_PUBLIC_KEY.replace(/\\n/g, '\n')}` , { algorithms: ['RS256'] });
        console.log(decoded.data)
        console.log(JSON.parse(decoded.data))
        res.send('ok');
    })
    app.listen(port);
})();