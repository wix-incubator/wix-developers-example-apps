# Step 3 - Find the right APIs using Wix documentation

<p align="center">
  <strong>
    <a href="../README.md#steps"> ↑ Back to ToC</a>&nbsp;&nbsp;&nbsp;
    <a href="02-create-an-app.md"> ← Previous Step</a>&nbsp;&nbsp;&nbsp;
    <a href="04-permissions.md"> → Next Step</a>
  </strong>
</p>
<hr/>

## In this step you will:
Use [Wix API Documentation Site][wix-docs] to:

 * Find the API to read store products.
 * Find the API to generate coupon.
 * Find the API to send messages to wix chat widget.
 

## Find the API to read store products.

-   In order to select the product of the day we need to access the API that get the store products, you can read more about it [here][wix-api-products] 

## Find the API to generate coupon.
-   Once the site owner select the product of the day and the discount percentage, we can then generate a coupon for that product, you can read more about the coupon API [here][wix-api-coupons]


## Find the API to send messages to wix chat widget.
-   After we generate the coupon we need the option to response back and write it in a messgae using the wix chat API, you can read more about it [here][wix-api-chat]



## Next step ➡️

[4. Add permissions to the app.][step04]


[gh-back]: ../README.md#steps

[wix-docs]: https://dev.wix.com/api/rest/getting-started
[wix-api-products]: https://dev.wix.com/api/rest/wix-stores/catalog/products/query-products
[wix-api-coupons]: https://dev.wix.com/api/rest/coupons/coupons/coupon/create-a-coupon
[wix-api-chat]: https://dev.wix.com/api/rest/inbox/messages/send-message
[step04]: 04-permissions.md
