# User flow for usability testing

You can review the current user flow in Wix and where your app should trigger its email.

1. Customer views a site's products:  
  [view products](./images/view-products.png?raw=true)  
1. Customer views a specific product:  
    [view product](./images/view-product.png?raw=true) 
3. When relevant, customer selects product options:  
  [select product options](./images/select-product-options.png?raw=true)  
1. Customer adds the product to cart:  
   [add product to cart](./images/add-product-to-cart.png?raw=true)  
1. Customer views the cart:  
   [view in cart](./images/view-in-cart.png?raw=true)  
1. Customer completes the checkout flow:  
   A. Provides shipping details:  
   [checkout-1-shipping](./images/checkout-1-shipping.png?raw=true)  
   B. Selects delivery options:  
   [checkout-2-delivery](./images/checkout-2-delivery.png?raw=true)  
   C. Selects payment method and provide payment details:  
   [checkout-3-payment](./images/checkout-3-payment.png?raw=true)  
1. Customer places the order:  
   [place order](./images/place-order.png?raw=true)  
1. Wix sends an email to the customer:  
   [wix email sent](./images/wix-email-sent.png?raw=true)  
1. Your app sends an email message to the customer with an invoice including:  
   Basic:
     - subject line
     - site name
     - site logo
     - site address
     - invoice number
     - transaction date
     - customer name
     - shipping address
     - line item name  
     - line item quantity  
     - line item price
     - total price
  
   Advanced:
     - line item image  
     - Wix Bookings number of attendees  
     - Wix Events guest details
     - Wix Pricing Plans free trial info  
     - Wix Restaurants order fulfillment type  
     - Wix Stores subscription info
  
 ## Notes:
  - You can use Wix Inbox functionality to send the invoice to the customer via email.
  - On the test sites we've prepared for you, you can make test transactions with the following credit cards:
     - For SUCCESSFUL (APPROVED) Transactions
       - CC number: 4111 1111 1111 1111 
       - Exp.date: 03/30 
       - CVV: 737
    - For UNSUCCESSFUL (DECLINED) Transaction
        - CC number: 4000 0000 0000 0002 
        - Exp.date: 03/30
        - CVV: 111
   
