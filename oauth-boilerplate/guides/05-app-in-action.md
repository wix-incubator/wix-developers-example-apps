# Step 5 - See your new app in action.

<p align="center">
  <strong>
    <a href="../README.md#steps"> ↑ Back to the beginning</a>&nbsp;&nbsp;&nbsp;
    <a href="04-OAuth.md"> ← Previous Step</a>&nbsp;&nbsp;&nbsp;
  </strong>
</p>
<hr/>

## In this step you will:
 * Install the app on the development site you created.
 
 
## Install the app on the development site you created
- Go to your app at [Wix Developer Center][wix-dev-center]
- Click `Test Your App` and select the `App Market` option. You'll be redirected to select the site you want to install the app on. 
Select any site and you'll be redirected to the app installer. 
  ![wix development site](../images/test-your-app.jpg?raw=true)
- In the app installer you can see the app needed permission. These are the permissions a site owner sees when installing your app. Click `Add To Site`.

  ![wix development site](../images/installer.jpg?raw=true)

- After installation you will be redirected to the app dashboard to see the result of calling the API of app instance


## You can now try to browse the code and try understand it:
  - Look for the `WixOAuthFacade` and `WixAuthController` classes For OAUTH.
  - Look for the `ApiController` class to understand the call to the `\api\dashboard` URL.
  - Look for the `InstanceDecoder` to understand how we parse signInstance param which wix inject to the dashborad url in order for you to recognise the specific installation of your site.
  - Read more about app instance [here][app-instance]


  [app-instance]: https://devforum.wix.com/kb/en/article/app-instance-client-side






