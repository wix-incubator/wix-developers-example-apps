# Step 7 - Add Webhooks.

<p align="center">
  <strong>
    <a href="../README.md#steps"> ↑ Back to the beginning</a>&nbsp;&nbsp;&nbsp;
    <a href="06-OAuth.md"> ← Previous Step</a>&nbsp;&nbsp;&nbsp;
    <a href="08-app-in-action.md"> → Next Step</a>
  </strong>
</p>
<hr/>

## In this step you will:
 * Find the right webhook at the [Wix API Documentation Site][wix-docs]   
 * Add a [webhook] to your app at the [Wix Developer Center][wix-dev-center] This lets us get a callback to our server when a site visitor writes a message in the chat.
 * Replace the webhook public key in the .env file
 
## Find the right webhook 
- Go to Message Sent To Business Webhook [wix-api-chat-webhook] and read about how to get a callback webhook on every new message from site visitors in the Wix Chat widget.


## Add a webhook to your app

-   Go to your app in [Wix Developer Center][wix-dev-center]
-   Look for the Webhooks page in the sidebar. Click `Add Webhook` button.
- Since we need to receive a webhook for every new message a site visitor sends in the Wix Chat widget we need to configure a webhook in our app. In the API category select `Wix Chat` and then select the `Message Sent To Business`. 
Once you've started the node server you should see a printed output in the terminal. Copy the result of the `Message received webhook:` output and put it in the `Callback URL` field. 
It should look like this:
    ![wix development site](../images/webhook.jpg?raw=true)

## Replace the webhook public key in the .env file
- Open the `Webhooks` page of your app in the [Wix Developer Center][wix-dev-center]
  
- Look for the `Public key` section, open it and click `Copy Key`.
It should look like this:
  ![wix development site](../images/webhooks-public-key.jpg?raw=true)
- Open the `.env` under the server folder.

- Replace the `WEBHOOK_PUBLIC_KEY` parameter.

```bash
  yarn run stop 
```    
And 
```bash
  yarn run start
```   
to restart the server

## Next step ➡️

[8. See the app in action.][step08]

[webhook]: https://en.wikipedia.org/wiki/Webhook
[gh-back]: ../README.md#steps
[step08]: 08-app-in-action.md
[wix-dev-center]: https://dev.wix.com
[wix-docs]: https://dev.wix.com/api/rest/getting-started
[wix-api-chat-webhook]: https://dev.wix.com/api/rest/inbox/messages/message-sent-to-business-webhook
