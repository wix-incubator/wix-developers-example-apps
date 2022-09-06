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

 * Start the client React js project.
 * Add the dashboard component to your app in the [Wix Developer Center][wix-dev-center] This is where the site owner chooses the product of the day and the discount percentage.
 
 

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
- Usually the command `run start:secure` will open `https://localhost:3000` in your browser and you will see this message:
`Your connection is not private`.

    You are getting this message, because you don't have a certificate for your localhost machine, since you can trust this code, we can proceed.

    ![wix development site](../images/https-localhost.jpg?raw=true)

    Click `Advanced` and then click the `Proceed to localhost (unsafe)` link.

    It should look like:
    
    ![wix development site](../images/https-proceed.jpg?raw=true)

    Then you will see the dashboard UI loading:


    ![wix development site](../images/ui-dashboard.jpg?raw=true)

    

## Add a dashboard component to your app in the Wix Developers Center
-   Go to your app [Wix Developer Center][wix-dev-center]
-   Look for the `Components` page on the left sidebar and click `Add Component`, choose `Dashboard Component`. It should look like:

    ![wix development site](../images/add-component.jpg?raw=true)
-   Set the `Page URL` of the `Dashboard Page` to be: 
    ```bash
    https://localhost:3000/
    ```
    And click `Save`, It should look like this:

    ![wix development site](../images/dashboard-localhost.jpg?raw=true)




## Next step ➡️

[6. Configure OAuth.][step05]


[gh-back]: ../README.md#steps
[step05]: 06-OAuth.md
[wix-dev-center]: https://dev.wix.com
