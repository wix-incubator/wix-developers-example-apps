# Extra help for step 5

## Permissions  
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

## Webhooks   
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

## API Calls

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
