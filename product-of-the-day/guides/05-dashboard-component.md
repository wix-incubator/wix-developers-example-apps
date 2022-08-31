# Step 5 - Create the Dashboard component.

<p align="center">
  <strong>
    <a href="../README.md#steps"> ↑ Back to the beginning</a>&nbsp;&nbsp;&nbsp;
    <a href="04-permissions.md"> ← Previous Step</a>&nbsp;&nbsp;&nbsp;
    <a href="06-OAuth.md"> → Next Step</a>
  </strong>
</p>
<hr/>

## In this step you will:

 * Start the client React js project
 * Add the dashboard component, where the site owner choose the product of the day and the discount percentage, to your app in the [Wix Developer Center][wix-dev-center]
 

## Start the client React js project.

-   Go to the client folder in the terminal
   
    ```bash
    cd client 
    ```
-  Run one of the following to install js packages:
    ```bash
    yarn 
    ```
    Or
    ```bash
    npm install 
    ```
-  After the installation ends successfuly start the client on port 3000
    ```bash
    yarn start:secure 
    ```
    Or
    ```bash
    npm run start:secure 
    ```


## Add dashboard component to your app in the [Wix Developer Center][wix-dev-center]
-   Go to your app at [Wix Developer Center][wix-dev-center]
-   Look for the components page at the left toolbar and click `Add Component` button, choose `Dashborad Component` similar to the following:

    ![wix development site](../images/add-component.jpg?raw=true)
-   Set the `Page URL` of the `Dashboard Page` to be: 
    ```bash
    https://localhost:3000/
    ```
    And click save, similar to the following:

    ![wix development site](../images/dashboard-localhost.jpg?raw=true)




## Next step ➡️

[6. Configure OAuth.][step05]


[gh-back]: ../README.md#steps
[step05]: 06-OAuth.md
[wix-dev-center]: https://dev.wix.com
