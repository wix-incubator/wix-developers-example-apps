# Wix App Market - OAuth boilerplate for usability testing

You'll build a new `Wix app` with the help of this step-by-step guide.
 
You'll learn about Wix APIs, components, OAUTH, and other best practices.


## Prerequisites

Before you get started, let's make sure you have the following set up in your workspace:

- Sign in to Wix at [https://www.wix.com] with a **non-wix** email account.
  > **Important**: Do not use your wix email account to create your app for this usability session! If you do, if/when you get stuck, there will be no way to fix it :(
- Have Node.js installed on your computer (version 16.14.0 or higher) [https://nodejs.org/en/download/].
- IDE/text editor. (For example, Visual Studio Code) [https://code.visualstudio.com/].
- Access to one our test sites.
- Access to our [feedback form](https://docs.google.com/forms/d/e/1FAIpQLSc2ep6mxEMAdoTGmXxmN1I8ENGVbXlHVSMJFwXqe1JkJSHK_g/viewform?usp=sf_link) - please fill it out as you go through the process.
- Please fill in the [feedback form](https://docs.google.com/forms/d/e/1FAIpQLSc2ep6mxEMAdoTGmXxmN1I8ENGVbXlHVSMJFwXqe1JkJSHK_g/viewform?usp=sf_link) before moving on to the next step.
  

## 🚀 Your goal

Wix enables site owners to sell products, services, etc. for purchase through their site.  
Every purchase triggers the creation of a transaction within Wix.  
You are an invoice company (e.g. Blue Invoice) developer and you want to create an app that will integrate with Wix sites and will generate **Blue Invoice** invoices.  
Create an application that will:  
- create an invoice (including list of the purchased items, amount paid per item, total amount paid, customer name and address, site name, etc.) for every transaction made through Wix on a Wix site. 
- send the invoice to the customer’s email.
For the full use case and flow, see the [User Flow for Usability Testing](./USERFLOW4TESTING.md) article.



## Steps:

### Step 1 - Clone the `wix-developers-example-apps` repository

1. In your Terminal emulator, run the following command from the folder that will hold your projects:

```bash
git clone https://github.com/wix-incubator/wix-developers-example-apps.git
```

The repository should now be cloned to your computer.

2. Change directory to the OAuth bolierplate

```bash
cd wix-developers-example-apps/oauth-boilerplate
```

If you do not use Git, you can download zip file of this repo, under `Code` click the `Download ZIP`, similar to the following:

![Download zip](images/download-repo-zip.jpg?raw=true)

3. Please fill in the [feedback form](https://docs.google.com/forms/d/e/1FAIpQLSc2ep6mxEMAdoTGmXxmN1I8ENGVbXlHVSMJFwXqe1JkJSHK_g/viewform?usp=sf_link) before moving on to the next step.

### Step 2 - Create an app in the Wix Developers Center

-   [Go to Wix Developers Center (https://dev.wix.com)][wix-dev-center]

-   Click the `Start Now` button.

-  If this is your first app, click `Start Building`. If you already have an app, you should see and click `Create New App` instead.

-  Please fill in the [feedback form](https://docs.google.com/forms/d/e/1FAIpQLSc2ep6mxEMAdoTGmXxmN1I8ENGVbXlHVSMJFwXqe1JkJSHK_g/viewform?usp=sf_link) before moving on to the next step.

### Step 3 - Start Node.js and configure OAuth
 

1. Start the Node.js server:

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

    ![app secret](images/app-id-app-secret.jpg?raw=true)
    
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

    ![terminal](images/terminal-new.jpg?raw=true)
    
    In the next step we will need the `AppUrl` and `RedirectUrl` you got in the terminal.


2. Configure the [OAuth] at the [Wix Developer Center][wix-dev-center]
-   Go to your app in [Wix Developer Center][wix-dev-center]
-   Look for the `OAuth` page in the sidebar. Under the `URLs` section insert the `Redirect URL` and the `App URL` you copied from the terminal output you got in the previous step.
-   Click `Save`. It should look like this:
    ![wix development site](images/oauth-appurl-redirect.jpg?raw=true)  
3. Please fill in the [feedback form](https://docs.google.com/forms/d/e/1FAIpQLSc2ep6mxEMAdoTGmXxmN1I8ENGVbXlHVSMJFwXqe1JkJSHK_g/viewform?usp=sf_link) before moving on to the next step.

### Step 4 - Add a dashboard component to your app in the Wix Developers Center

1. Go to your app in the [Wix Developers Center][wix-dev-center]
2. Look for the `Components` page on the left sidebar and click `Add Component`, choose `Dashboard Component`. It should look like:

   ![wix development site](images/add-component.jpg?raw=true)
   
3. Click `Dashboard Page`, It should look like:

   ![wix development site](images/dashboard-component-types.png?raw=true)
   
4. If you already started your server:
  - you will see in the terminal the `app dashboard link:`
  - copy it from ther terminal and paste it into the `Page URL` field of the `Dashboard Page` component in the Developers Center
  -  click `Save`.
  It should look like this:

     ![wix development site](images/dashboard-new.jpg?raw=true)
5. Please fill in the [feedback form](https://docs.google.com/forms/d/e/1FAIpQLSc2ep6mxEMAdoTGmXxmN1I8ENGVbXlHVSMJFwXqe1JkJSHK_g/viewform?usp=sf_link) before moving on to the next step.

### Step 5 - Configure your app to fulfill your use case
If you haven't already, review the expected [user flow](./USERFLOW4TESTING.md).  


Please fill in the [feedback form](https://docs.google.com/forms/d/e/1FAIpQLSc2ep6mxEMAdoTGmXxmN1I8ENGVbXlHVSMJFwXqe1JkJSHK_g/viewform?usp=sf_link) before moving on to the next step.

### Step 6 - Install the app and test it on the test site 

1. Go to your app at [Wix Developer Center][wix-dev-center]  
2. Click `Test Your App` and select the `App Market Website` option. You'll be redirected to select the site you want to install the app on.
    ![wix development site](images/test-your-app.png?raw=true) 
3. Select the test site you were added to, and you'll be redirected to the app installer.   
4. In the app installer you can see the app needed permission. These are the permissions a site owner sees when installing your app. Click `Add To Site`.  
  ![wix development site](images/installer.jpg?raw=true)
5. After installation you will be redirected to the app dashboard to see the result of calling the API of app instance.
6. Trigger a purchase in the live site and check that your app behaves as expectected.
7. Please fill in the [feedback form](https://docs.google.com/forms/d/e/1FAIpQLSc2ep6mxEMAdoTGmXxmN1I8ENGVbXlHVSMJFwXqe1JkJSHK_g/viewform?usp=sf_link) before moving on to the next step.

#### You can browse the code and try understand it:
  - Look for the `WixOAuthFacade` and `WixAuthController` classes For OAUTH.
  - Look for the `ApiController` class to understand the call to the `\api\dashboard` URL.
  - Look for the `InstanceDecoder` to understand how we parse signInstance param which wix inject to the dashborad url in order for you to recognise the specific installation of your site.
  - Read more about app instance [here][app-instance].


  [app-instance]: https://devforum.wix.com/kb/en/article/app-instance-client-side
  [wix-dev-center]: https://dev.wix.com
  [OAuth]: https://dev.wix.com/api/rest/getting-started/authentication
