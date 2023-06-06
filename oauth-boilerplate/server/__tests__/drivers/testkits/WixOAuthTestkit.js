const express = require('express')
const {randomPort, randomString} = require("../../utils");
const {json} = require('body-parser');
const {v4: uuid} = require('uuid');
const http = require('http');

class WixOAuthTestkit {
    constructor(port = randomPort()) {
        this.app = express();
        this.loggedCalls = [];
        this.refreshTokensFromAuthCode = [];
        this.accessTokenFromRefreshToken = [];
        this.validAccessTokens = [];
        this.validTokens = [];
        this.port = port;
        this.connections = [];
    }


    beforeAndAfter() {
        this._server = http.createServer(this.app).on('connection', connection => {
            this.connections.push(connection);
            connection.on('close', () => this.connections = this.connections.filter(curr => curr !== connection));
        });
        beforeAll(async () => {
            this.app.use(json());
            this.registerRoutes();
            this._server.listen(this.port);
        });
        beforeEach(() => {
            this.loggedCalls = [];
            this.refreshTokensFromAuthCode = [];
            this.accessTokenFromRefreshToken = [];
            this.validAccessTokens = [];
            this.validTokens = [];
        })

        afterAll(() => {
            this.connections.forEach(curr => curr.end());
            this._server.close()
        })

    }

    get baseUrl() {
        return `http://localhost:${this.port}`;
    }

    givenToken = (appId, appSecret) => {
        const token = uuid();
        this.validTokens.push({appId, appSecret, token});
        return {token}
    }

    givenAuthCodeReturnsRefreshToken = (appId, appSecret) => {
        const code = randomString();
        this.refreshTokensFromAuthCode.push({appId, appSecret, code});
        return {authorization_code: code};
    }

    givenRefreshToken = (appId, appSecret, refreshToken) => {
        this.accessTokenFromRefreshToken.push({appId, appSecret, refreshToken});
    }

    registerRoutes = () => {
        this.app.use((req, res, next) => {
            console.log(`Incoming request to WixOAuthTeskit`, {
                url: req.url,
                method: req.method,
                headers: req.headers,
                body: req.body
            });
            this.loggedCalls.push({url: req.url, query: req.query, method: 'POST', body: req.body});
            next()
        })

        this.app.get('/installer/install', (req, res) => {
            const maybeFoundEntry = this.validTokens.find(e => e.appId === req.query.appId && e.token === req.query.token);
            if (maybeFoundEntry) {
                const {authorization_code} = this.givenAuthCodeReturnsRefreshToken(req.query.appId, maybeFoundEntry.appSecret);
                res.redirect(`${req.query.redirectUrl}?code=${authorization_code}`)
            } else {
                res.status(400).send('not good');
            }

        });

        this.app.get('/installer/close-window', (req, res) => {
            if (this.validAccessTokens.includes(req?.query?.access_token)) {
                console.log('request with valid token')
                res.json({finished: true});
            } else {
                console.log(req?.query?.access_token)
                res.status(400).send('not ok')
            }
        });

        this.app.post('/oauth/access', (req, res) => {
            const {
                client_id: appId,
                client_secret: appSecret,
                authorization_code: code,
                refresh_token: refreshToken
            } = req.body;
            console.log('Incoming access request', req.body)
            switch (req?.body?.grant_type) {
                case 'authorization_code': {
                    console.log('auth code')
                    console.log(this.refreshTokensFromAuthCode)
                    const matched = this.refreshTokensFromAuthCode.some(e => e.appId === appId && e.appSecret === appSecret && e.code === code) || {};
                    if (matched) {
                        const accessToken = randomString();
                        const createdRefreshToken = randomString();
                        this.givenRefreshToken(appId, appSecret, createdRefreshToken);
                        this.validAccessTokens.push(accessToken);
                        res.json({refresh_token: createdRefreshToken, access_token: accessToken})
                    } else {
                        console.log('Could not find provided details', req.body, this.refreshTokensFromAuthCode);
                        res.status(400).send({error: true});
                    }
                    break;
                }
                case 'refresh_token': {
                    const matched = this.accessTokenFromRefreshToken.some(e => e.appId === appId && e.appSecret === appSecret && e.refreshToken === refreshToken);
                    if (matched) {
                        const accessToken = randomString();
                        this.validAccessTokens.push(accessToken);
                        res.json({refresh_token: refreshToken, access_token: accessToken})
                    } else {
                        console.log('Could not find provided details', req.body, this.accessTokenFromRefreshToken);
                        res.status(400).send({error: true});
                    }
                    break;
                }
                default:
                    console.log('Could not match request');
                    res.status(400).send('bad')
                    break;


            }
        })


    }


}

module.exports = {WixOAuthTestkit}
