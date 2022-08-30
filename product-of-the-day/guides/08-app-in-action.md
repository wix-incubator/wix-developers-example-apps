# Step 8 - See your new app in action.

<p align="center">
  <strong>
    <a href="../README.md#steps"> ↑ Back to the beginning</a>&nbsp;&nbsp;&nbsp;
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


## Configure the product of the day and the discount percentage in the app dashboard under the site business manager.

-   Go to your site business manager by going to [My Sites][wix-com] page and click `Select & Edit Site` on your development site.
-   Look for the `Apps` at the left toolbar, click your app name to open the app dashboard.
-   In the search bar insert `I'm` or any other product name you have in your site store.
-   Select one of the product, insert `Discount Percentage` and click save.
 Similar to the following:

    ![wix development site](../images/app-dashboard.jpg?raw=true)


## Write a message in the wix chat widget and get back the generated coupon.    

- In the site business manager find the live site url, similar to the following:

  ![wix development site](../images/view-live-site.jpg?raw=true)
  
  Click the `View live site`
- In your live site, open the chat widget and type `Hey` similar to the following: 

  ![wix development site](../images/chat-live-site.jpg?raw=true) 

- If your app works you will get response with a coupon to the product of the day you choose in the app dashboard, similar to the following:

  ![wix development site](../images/coupon-gen.jpg?raw=true) 

## Use the coupon to get the discount on the product of the day.
- On the message you got back you have the coupon code, and a link to the product of the day, copy the coupon code and click the link. 
- Add the product of the day to the store cart and go to store checkout, add the coupon code to redeem the coupon and see that you got the Discount Percentage you added in the app dashboard in the previous steps.

  ![wix development site](../images/redeem-coupon.jpg?raw=true) 

## Next step ➡️

[9. Live coding.][step09]

[webhook]: https://en.wikipedia.org/wiki/Webhook
[gh-back]: ../README.md#steps
[step09]: 09-one-coupon-per-day.md
[wix-com]: https://manage.wix.com/account/sites
[wix-docs]: https://dev.wix.com/api/rest/getting-started
[wix-api-chat-webhook]: https://dev.wix.com/api/rest/inbox/messages/message-sent-to-business-webhook
