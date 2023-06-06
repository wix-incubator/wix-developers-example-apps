# Step 6 - Configure OAuth.

<p align="center">
  <strong>
    <a href="../README.md#steps"> ↑ Back to the beginning</a>&nbsp;&nbsp;&nbsp;
    <a href="03-dashboard-component.md"> ← Previous Step</a>&nbsp;&nbsp;&nbsp;
    <a href="05-app-in-action.md"> → Next Step</a>
  </strong>
</p>
<hr/>

## In this step you will:

 * Start the Node.js server.
 * Configure the [OAuth] at the [Wix Developer Center][wix-dev-center] which allow us to get access token to the wix site APIs.
 

## Start the Node.js server.

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
-  Under the server folder run the following command to create a `.env` file from the `example.env.text`   
    ```bash
    cp  example.env.txt .env
    ```
    Replace the `APP_ID` and `APP_SECRET` parameters in the `.env` file by taking them from the OAuth page of your app in the [Wix Developer Center][wix-dev-center].
    It should look like this:

    ![app secret](../images/app-id-app-secret.jpg?raw=true)
    
    We will skip the `WEBHOOK_PUBLIC_KEY` parameter for now.

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

    ![terminal](../images/terminal-new.jpg?raw=true)
    
    In the next step we will need the `AppUrl` and `RedirectUrl` you got in the terminal


## Configure the [OAuth] at the [Wix Developer Center][wix-dev-center]
-   Go to your app in [Wix Developer Center][wix-dev-center]
-   Look for the `OAuth` page in the sidebar. Under the `URLs` section insert the `Redirect URL` and the `App URL` you copied from the terminal output you got in the previous step. It should look like this::
    ![wix development site](../images/oauth-appurl-redirect.jpg?raw=true)


## Next step ➡️

[5. Install the app.][step05]


[gh-back]: ../README.md#steps
[step05]: 05-app-in-action.md
[wix-dev-center]: https://dev.wix.com
[OAuth]: https://dev.wix.com/api/rest/getting-started/authentication
