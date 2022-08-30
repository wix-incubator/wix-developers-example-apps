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
 * Add a [webhook] to your app at the [Wix Developer Center][wix-dev-center] which allow us to get a callback to our server when a site visitor write a message in the chat.
 
## Find the right webhook 
- Go to Message Sent To Business Webhook [wix-api-chat-webhook] and read about how to get a callback webhook on every new message from site visitors in the Wix Chat widget.


## Add a webhook to your app

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
