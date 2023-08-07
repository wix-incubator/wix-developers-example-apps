## Sample notes

**Recommended things to note:** 
- current time
- what they're doing/discussing
- what issue they are having
- comments

**Example (real notes from the POC):**  
11:02 - begin task  
general discussion  
opening all provided tools  

11:08 - started step 2  
struggled to figure out if they could both work on one app in the dev center from different machines  
ended up assigning all DC work to David

11:15 - dev center setup  
David is very familiar with DC, is flying through the steps

Try to note:
- what confuses and/or frustrates them, even if they figure it out right afterward
- how they approach each task
- what they misunderstand, can't find, do incorrectly
- what they do differently from the happy flow that works

## Extra help for step 5

### Happy flow 

1. Listening to transactions  
  they might choose any of the following:
  - Wix eCommerce > Orders > order approved webhook - easy to work with, only covers basic flow. for advanced they'll need to add the Cashier Pay   webhook.
  - Wix Cashier > Cashier Pay > payment event webhook - harder to use, covers both advanced and basic flows.
  - Wix Payments - dead end. Stop them if they start writing code based on this API.
2. Getting the site name
  they might choose either of the following:
  -  Business Info > Site Properties > Get Site Properties (`siteDisplayName` or `businessName`)
  -  App Management > Apps > Get App Instance
3. (they should provide their own invoice number)  
4. When listening to either ecom's order approved webhook or cashier's payment event webhook they will receive all of the next basic requirements:
    - purchase date
    - customer name
    - shipping address
    - line item name
    - line item quantity
    - line item price
    - total price 
5. line item image data is provided in the ecom webhook, but not cashier.
     - cashier webhook flow - call the relevant vertical's API to get the image (e.g., Stores > Get Product)
     - ecom webhook flow - collect the media ID from the webkook and call Media Manager's Generate Files Download URL
6. Wix Bookings number of attendees
     - [Query Extended Bookings](https://dev.wix.com/api/rest/wix-bookings/bookings-reader-v2/query-extended-bookings)
7. Wix Events guest details 
    - [Get Order](https://dev.wix.com/api/rest/wix-events/wix-events/order/get-order)
    - [List Orders](https://dev.wix.com/api/rest/wix-events/wix-events/order/list-order)  
8. Wix Pricing Plans free trial info
    - [Get Order](https://dev.wix.com/api/rest/wix-pricing-plans/pricing-plans/orders/get-order)
    - [List Orders](https://dev.wix.com/api/rest/wix-pricing-plans/pricing-plans/orders/list-orders)  
9. Wix Restaurants order fulfillment type
    - [Get Order](https://dev.wix.com/api/rest/wix-restaurants/orders/get-order)
    - [List Orders](https://dev.wix.com/api/rest/wix-restaurants/orders/list-orders)
10. Wix Stores subscription info
    - [Get Order](https://dev.wix.com/api/rest/wix-stores/orders/get-order)
    - [Query Orders](https://dev.wix.com/api/rest/wix-stores/orders/query-orders)  

  
### Other likely issues  

- Testing webhooks: Dev center test webhooks are dummy data, won't work well for things like app instance and site properties.

- Docs Playground: They won't be able to make calls from the playground to the test site because they didn't create the site themselves (Wix Docs limitation).

- Everything they need to listen to webhooks and make calls is already built into the sample app, they shouldn't have to write any of that code from scratch (e.g., collecting the access and refresh tokens).

- App IDs: For advanced flows, they'll need to differentiate between different app IDs. There's a list in the docs [here](https://dev.wix.com/docs/rest/articles/getting-started/wix-business-solutions) - remember we want them to find it on their own, don't tell them where it is unless they get really stuck.



### Dev center setup help

#### Permissions  
The following permissions are relevant to most invoicing apps:   

**Basic:**  
- Contacts & Members > Read members & contacts - all read permissions   
- Wix eCommerce > Read eCommerce - all read permissions  
- Wix Payments > Wix Payments - view transactions
- Inbox > Manage Inbox Messages

**Advanced:**  
- Wix Stores > Read Orders  
- Wix Bookings > Read Bookings (Including Participants)  
- Wix Events > Read Basic Events Order Info  
- Wix Restaurants > Read Orders  
- Wix Pricing Plans > Read Orders
- Media > Manage Media Manager

#### Webhooks   
The following webhooks are relevant to most invoicing apps:   
**Basic:**  
- App Management: 
  - App Installed
  - App Removed

- Wix eCommerce:
  - Order Approved
  - Order Updated
  - Payment Status Updated
  - Order Canceled

- Wix Payments:
  - Payment Event


**Advanced:**   
- Wix Stores
  - Order Paid
  - Order Canceled
  - Order Refunded
  
- Wix Bookings     
  - Booking Confirmed
     
- Wix Pricing Plans
  - Order Purchased
  - Order Marked as Paid

#### API Calls

**Basic:**
- App Management   
  - [Get App Instance](https://dev.wix.com/api/rest/app-management/apps/app-instance/get-app-instance)  
- Business Info  
  - [Get Site Properties](https://dev.wix.com/api/rest/business-info/site-properties/properties/get-site-properties)  
- Wix Cashier  
  - [Transactions List](https://dev.wix.com/api/rest/wix-cashier/payments/transactions-list)  
- Wix Ecommerce
  - [Get Order](https://dev.wix.com/api/rest/wix-ecommerce/orders/get-order)
- Inbox  
  - [Send Message](https://dev.wix.com/api/rest/inbox/messages/send-message)  
 
**Advanced:**  
- Media Manager
  - [Generate Files Download URL](https://dev.wix.com/docs/rest/api-reference/media/media-manager/files/generate-files-download-url)
- Wix Stores
  - [Get Order](https://dev.wix.com/api/rest/wix-stores/orders/get-order)
  - [Query Orders](https://dev.wix.com/api/rest/wix-stores/orders/query-orders)  
- Wix Bookings
  - [Query Extended Bookings](https://dev.wix.com/api/rest/wix-bookings/bookings-reader-v2/query-extended-bookings)
- Wix Restaurants
  - [Get Order](https://dev.wix.com/api/rest/wix-restaurants/orders/get-order)
  - [List Orders](https://dev.wix.com/api/rest/wix-restaurants/orders/list-orders)
- Wix Events
  - [Get Order](https://dev.wix.com/api/rest/wix-events/wix-events/order/get-order)
  - [List Orders](https://dev.wix.com/api/rest/wix-events/wix-events/order/list-order)  
- Wix Pricing Plans
  - [Get Order](https://dev.wix.com/api/rest/wix-pricing-plans/pricing-plans/orders/get-order)
  - [List Orders](https://dev.wix.com/api/rest/wix-pricing-plans/pricing-plans/orders/list-orders)  
