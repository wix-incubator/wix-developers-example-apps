# Step 9 - Live coding.

<p align="center">
  <strong>
    <a href="../README.md#steps"> ↑ Back to the beginning</a>&nbsp;&nbsp;&nbsp;
    <a href="08-app-in-action.md"> ← Previous Step</a>&nbsp;&nbsp;&nbsp;
    <em>→ Next Step</em>
  </strong>
</p>
<hr/>

## In this step you will:
 * Since we do not save the coupon sent date, for now our app generate product of the day coupon for every message, let's change that.
 * Save the coupon data by conversion Id and date
 * Check if this visitor got a valid coupon for the current date and do not generate a new one.
 
## Save the coupon data by conversion Id and date
- In our code find the file `ProductOfTheDayService.js` 
    First create the date format, add [dayJs] at the top of the file
    ```bash
        const dayjs = require('dayjs')
    ```
    And in the `sendCouponOfTheDay` function add 
    ```bash
        const today =  dayjs().format('DD/MM/YYYY')
    ```
    Now use this `today` varibale, the conversationId and coupon data to save it in the coupon database
    ```bash
        this.couponsDao.save(instanceId, conversationId, today, couponData)
    ```

## Check if this visitor got a valid coupon for the current date and do not generate a new one.

-   In the same file and function `sendCouponOfTheDay` we need to add condition not to send the coupon
    first we need to check if coupon for this conversion Id and date exist on our database
    ```bash
        const coupon = await this.couponsDao.getBy(conversationId, today)
    ```

    Second we add if statement to check if this coupon is empty, we will use [lodash] for that.

    add this code the top of our js file `ProductOfTheDayService.js`
    ```bash
        const _ = require('lodash')
    ```

    We now can use lodash [isEmpty] in our if statement like in the following:
    ```bash
       if(_.isEmpty(coupon)){
    ```

    Now we are sending a coupon only once every day for conversion id.





[gh-back]: ../README.md#steps
[dayJs]: https://day.js.org/
[lodash]: https://lodash.com/
[isEmpty]: https://lodash.com/docs/4.17.15#isEmpty