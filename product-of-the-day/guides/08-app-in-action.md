# Step 8 - See your new app in action.

<p align="center">
  <strong>
    <a href="../README.md#steps"> ↑ Back to ToC</a>&nbsp;&nbsp;&nbsp;
    <a href="07-webhooks.md"> ← Previous Step</a>&nbsp;&nbsp;&nbsp;
    <a href="09-one-coupon-per-day.md"> → Next Step</a>
  </strong>
</p>
<hr/>

## In this step you will:
 * Install the app on the development site you created.
 * Configure the product of the day and the discount percentage in the app dashboard.
 * Write a message in the wix chat widget and get back the generated coupon.
 * Use the coupon to get the discount on the product of the day.
 
## Install the app on the development site you created
- Go to your app at [Wix Developer Center][wix-dev-center]
- Click the `Test Your App` button and select the `Dashboard` option, you will be redirect to select the site you want to install the app, select the development site we created that include wix stores and you will be redirect to the app installer. 
  ![wix development site](../images/test-your-app.jpg?raw=true)
- In the app installer you can see the app needed permission, this is the  permissions a site owner will see when installing your app. Click the `Add To Site` button.

  ![wix development site](../images/installer.jpg?raw=true)


## Configure the product of the day and the discount percentage in the app dashboard.

-   Go to your app at [Wix Developer Center][wix-dev-center]
-   Look for the Webhooks page at the left toolbar, click the `Add Webhook` button.
- Since we need to recived a webhook on every new message site visitor sends in the wix chat widget we need to configure a webhook in our app At the API category select `Wix Chat` and then select the `Message Sent To Business` From the printed output in the terminal which you can see after starting the node server, copy the result of the `Message received webhook:` output and put it in the `Callback URL` field, Similar to the following:
    ![wix development site](../images/webhook.jpg?raw=true)


## Next step ➡️

[8. See the app in action.][step08]

[webhook]: https://en.wikipedia.org/wiki/Webhook
[gh-back]: ../README.md#steps
[step08]: 08-app-in-action.md
[wix-dev-center]: https://dev.wix.com
[wix-docs]: https://dev.wix.com/api/rest/getting-started
[wix-api-chat-webhook]: https://dev.wix.com/api/rest/inbox/messages/message-sent-to-business-webhook
