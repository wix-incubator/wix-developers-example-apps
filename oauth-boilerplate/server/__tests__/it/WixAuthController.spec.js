const {v4: uuid} = require('uuid')
const {startEnv} = require("./env");


describe('WixAuthController', () => {

    const {appSecret, axiosInstance, appId, oauthTestkit, redirectUrl} = startEnv();

    // it('should redirect to wix when going to appUrl', async () => {
    //     const token = uuid();
    //     const {
    //         status,
    //         headers
    //     } = await axiosInstance.get(`/auth/app-wix?token=${token}`, {maxRedirects: 0}).catch(e => e.response);
    //     const expectedUrl = `${oauthTestkit.baseUrl}/installer/install?token=${token}&state=start&appId=${appId}&redirectUrl=${encodeURIComponent(redirectUrl)}`;
    //     expect(status).toEqual(302);
    //     expect(headers.location).toEqual(expectedUrl);
    // });

    it('should go through entire flow and finally run a post to close-window', async () => {
        const {token} = oauthTestkit.givenToken(appId, appSecret);
        await axiosInstance.get(`/auth/app-wix?token=${token}`);
        expect(oauthTestkit.loggedCalls).toContainEqual(expect.objectContaining({url: expect.stringContaining('/installer/close-window?access_token')}))
    });

    afterAll(() => {
        return ;
    });


})
