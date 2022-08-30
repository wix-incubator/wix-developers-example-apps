# Step 4 -  Add permissions to the app

<p align="center">
  <strong>
    <a href="../README.md#steps"> ↑ Back to ToC</a>&nbsp;&nbsp;&nbsp;
    <a href="03-find-apis.md"> ← Previous Step</a>&nbsp;&nbsp;&nbsp;
    <a href="05-dashboard-component.md"> → Next Step</a>
  </strong>
</p>
<hr/>

## In this step you will:
Use [Wix API Documentation Center][wix-docs] to add permission to the app at the [Wix Developer Center][wix-dev-center]:

 * Find the permission to read store products and add it to the app.
 * Find the permission to generate coupon and add it to the app.
 * Find the permission to send messages to wix chat widget and add it to the app.
 

## Find the permission to read store products and add it to the app.

-   You can see in store product API [link][wix-api-products] that you need to use the `Read Products` permission.
Add it to the app permission page similar to this: 
![wix development site](../images/Read-products.jpg?raw=true)

## Find the permission to generate coupon and add it to the app.
-   You can see in coupon API [link][wix-api-coupons] that you need to use the `Manage Coupons` permission.
Add it to the app permission page similar to this: 
![wix development site](../images/manage-coupon.jpg?raw=true)

## Find the permission to send messages to wix chat widget and add it to the app.
-   You can see in chat API [link][wix-api-chat] that you need to use the `Manage Inbox Messages` permission.
Add it to the app permission page similar to this: 
![wix development site](../images/chat-permission.jpg?raw=true)



## Next step ➡️

[5. Create the Dashboard component.][step05]


[gh-back]: ../README.md#steps

[wix-docs]: https://dev.wix.com/api/rest/getting-started
[wix-api-products]: https://dev.wix.com/api/rest/wix-stores/catalog/products/query-products
[wix-api-coupons]: https://dev.wix.com/api/rest/coupons/coupons/coupon/create-a-coupon
[wix-api-chat]: https://dev.wix.com/api/rest/inbox/messages/send-message
[step05]: 05-dashboard-component.md
[wix-dev-center]: https://dev.wix.com
