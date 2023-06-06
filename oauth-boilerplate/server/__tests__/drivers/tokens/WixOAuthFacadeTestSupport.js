const {mock, instance, when} = require('ts-mockito');
const {WixOAuthFacade} = require("../../../src/tokens/WixOAuthFacade");
const {randomString} = require("../../utils");

const wixOAuthFacadeMock = mock(WixOAuthFacade);

let wixOAuthFacade = instance(wixOAuthFacadeMock);
let accessToken = randomString();


beforeEach(() => {
    wixOAuthFacade = instance(wixOAuthFacadeMock);
    accessToken = randomString();
});

const givenAccessToken = (refreshToken, accessToken) =>
    when(wixOAuthFacadeMock.getFreshAccessToken(refreshToken)).thenResolve({accessToken})


module.exports = {
    wixOAuthFacade,
    givenAccessToken,
    accessToken
}
