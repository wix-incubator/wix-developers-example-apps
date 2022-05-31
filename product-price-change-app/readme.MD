# Overview:
This is an example app, demonstrating devcenter capabalities like:Permissions, OAuth, Webhhooks, Dashboard Componenets, Web Component


The app presenst one Dashboard component which you can access and control from manage app page via Business Manager
as well as a UI widget 'Web Component' which is displayed in each product page

the app will return to the widget the amount of pruchases occured for a specific product

# Pre Requisites:
node: v16 
npm: v7
https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

# Installation:
1. clone this Repo
2. go to https://dev.wix.com and create an app
3. go to OAuth tab in devcenter and copy the app id and app secret to a .env file under wix-react-web-component/server foler
for example here is a .env file:
```
APP_ID=2734202e-f600-46a5-0000-9bf8a3c6a139
APP_SECRET=0564082c-906f-4f21-0000-5ed58a1cc92e
WEBHOOK_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOC0000MIIBCgKCAQEAvOTHyBux7eg2V0Lba1XD\nVDAATJVNxU6wJi37bTFzDHRPtdgXNdDwdgPRRon1p8GcQnM167Qlm3xVJIPuZl8J\ni200HX41X74JcOE3TxoJZ/Z8JhGFRgj5aX8qaiwyxJ1ENzNjVtDi/yM0000/cZ3\nksXZulf6alMwk8SGocinodl9duaVB5SZyu4Bpk5HLud2edhSIm8aIwZFh+9fYcg5\neNvm9hdnb658MvM8gJ65GihbxLzzBz8PGU3xzJHmS7us4FjSJnYtiszWU41EA3ur\naNmgVpYiWHeANfw3hG4XT+mga9Lut1033m5yM74b2TmMYKAvUMZQ/6SAgqoME6/V\nHQIDAQAB\n-----END PUBLIC KEY-----"
```

6. cd to the wix-react-web-component/server folder and run: `npm i && npm run start`
7. cd to the wix-react-web-component/client folder and run: `npm i && npm run start`
8. cd to the wix-react-web-component/wix-react-web-component folder and run: `npm run clean:install && npm run dev`




