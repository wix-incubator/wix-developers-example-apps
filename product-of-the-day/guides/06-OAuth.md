# Step 6 - Configure OAuth.

<p align="center">
  <strong>
    <a href="../README.md#steps"> ↑ Back to the beginning</a>&nbsp;&nbsp;&nbsp;
    <a href="05-dashboard-component.md"> ← Previous Step</a>&nbsp;&nbsp;&nbsp;
    <a href="07-webhooks.md"> → Next Step</a>
  </strong>
</p>
<hr/>

## In this step you will:

 * Start the node js server
 * Configure the OAuth at the [Wix Developer Center][wix-dev-center] which allow us to get access token to the wix site APIs.
 

## Start the nodeJs server.

-   Go to the server folder in a new terminal
   
    ```bash
    cd server 
    ```
-  Run one of the following to install js packages:
    ```bash
    yarn 
    ```
    Or
    ```bash
    npm install 
    ```
-  Under the server folder run the following command that create a `.env` file from the `example.env.text`   
    ```bash
    cp  example.env.txt .env
    ```
    Replace the `APP_ID` and `APP_SECRET` parameters in the `.env` file by taking them from the OAuth page of your app at the [Wix Developer Center][wix-dev-center]
    Similar to the following:

    ![wix development site](../images/app-id-app-secret.jpg?raw=true)
    
    We will skip the `WEBHOOK_PUBLIC_KEY` for now.

-  After the installation ends successfuly and you have `.env` file ready with your `APP_ID` and `APP_SECRET` parameters it's time to start the server.
Run the following command:
    ```bash
    yarn run start 
    ```
    Or
    ```bash
    npm run start 
    ```
    In the terminal you will get something similar to the following:
    ![wix development site](../images/server-terminal-start.jpg?raw=true)
    
    In the next step we will need the `AppUrl` and `RedirectUrl` you got in the terminal

- Other server commands (Use `npm` insted of `yarn` if prefered):
    - Stop the server    
        ```bash
        yarn run stop 
        ```
    - See the server logs    
        ```bash
        yarn run logs
        ```
    - Delete the server from [pm2]
        ```bash
        yarn run delete
        ```
    - Run tests    
        ```bash
        yarn run tests
        ```    

## Configure the OAuth at the [Wix Developer Center][wix-dev-center]
-   Go to your app at [Wix Developer Center][wix-dev-center]
-   Look for the OAuth page at the left toolbar, under the `URLs` section insert the `Redirect URL` and the `App URL` you copied from the terminal output you got in the previous step,  Similar to the following:
    ![wix development site](../images/oauth-appurl-redirect.jpg?raw=true)


## Next step ➡️

[7. Add Webhooks.][step07]

[pm2]: https://pm2.keymetrics.io/
[gh-back]: ../README.md#steps
[step07]: 07-webhooks.md
[wix-dev-center]: https://dev.wix.com
