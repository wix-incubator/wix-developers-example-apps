require('dotenv').config();
const localtunnel = require('localtunnel');

(async () => {
    const tunnel = await localtunnel({port: 3000, subdomain: process.env.APP_ID});

    tunnel.url;
    console.log(tunnel.url)

    tunnel.on('close', () => {
        // tunnels are closed
    });
})();
