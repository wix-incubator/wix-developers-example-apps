require('dotenv').config();
const {startServer, createControlers} = require('./src/app');
const Client = require("ssh2").Client; // To communicate with Serveo
const Socket = require("net").Socket; // To accept forwarded connections (native module)




const startTunnel = async () => {
    
    const app = startServer()
    app.listen(8080);

    // Create an SSH client
    const conn = new Client();
    // Config, just like the second example in my question
    const configSSH = {
        remoteHost: "localhost",
        remotePort: 80,
        localHost: "localhost",
        localPort: 8080
    };

    let firstTimePrint = false // since we get to stream.on("data") multi times
    

    conn.on("ready", () => {
    // When the connection is ready
    console.log("Connection ready");
    //firstTimePrint = false
    // Start an interactive shell session
    conn.shell((err, stream) => {
      if (err) throw err;
      // And display the shell output (Serveo link)
      stream.on("data", data => {
        //console.log("data: " + data);
        if(!firstTimePrint){
            const baseUrl = getBaseUrl(data.toString());
            if(baseUrl != ""){
                firstTimePrint = true;
                printUrls(app, baseUrl);
            }
            
        }
      });
    });
    // Request port forwarding from the remote server
    conn.forwardIn(configSSH.remoteHost, configSSH.remotePort, (err, port) => {
      if (err) throw err;
      conn.emit("forward-in", port);
    });
  }).on("tcp connection", (info, accept, reject) => {
    //console.log("Incoming TCP connection", JSON.stringify(info));
    let remote;
    const srcSocket = new Socket();
    srcSocket
      .on("error", err => {
        if (remote === undefined) reject();
        else remote.end();
      })
      .connect(configSSH.localPort, configSSH.localPort, () => {
        remote = accept()
          .on("close", () => {
            //console.log("TCP :: CLOSED");
          })
          .on("data", data => {
            // console.log(
            //   "TCP :: DATA: " +
            //   data
            //   .toString()
            //   .split(/\n/g)
            //   .slice(0, 2)
            //   .join("\n")
            // );
          });
        //console.log("Accept remote connection");
        srcSocket.pipe(remote).pipe(srcSocket);
      });
  })
  // Connect to Serveo
  .connect({
    host: "serveo.net",
    username: process.env.APP_ID,
    tryKeyboard: true,
    keepaliveInterval: 3600, //How often (in milliseconds) to send SSH-level keepalive packets to the server 
    keepaliveCountMax: 60 //How many consecutive, unanswered SSH-level keepalive packets that can be sent to the server before disconnection
  });

    
}

function printUrls(app, baseUrl) {

    const {APP_ID, APP_SECRET, WEBHOOK_PUBLIC_KEY} = process.env;
    const appUrl = `${baseUrl}/auth/app-wix`
    const redirectUrl = `${baseUrl}/auth/redirect-wix`;
    const installedWebhook = `${baseUrl}/webhooks/app-installed`;
    const removedWebhook = `${baseUrl}/webhooks/app-removed`;
    const purchasedWebhook = `${baseUrl}/webhooks/plan-purchased`;
    const apiTestLink = `${baseUrl}/api/test`;
    const dashbaordLink = `${baseUrl}/api/dashboard`;

    const wixBaseUrl = 'https://www.wix.com';
    const wixApiUrl = 'https://www.wixapis.com/';
    const config = {APP_ID, APP_SECRET, port: 8080, appUrl, redirectUrl, wixBaseUrl, WEBHOOK_PUBLIC_KEY, wixApiUrl};

    createControlers(app, config);
    

    console.log(`Local server running on port 8080
RedirectUrl: ${redirectUrl}
AppUrl: ${appUrl}   
app installed webhook: ${installedWebhook}
app purchased webhook: ${purchasedWebhook}
app removed Webhook: ${removedWebhook}
app dashboard link: ${dashbaordLink}
API test link: ${apiTestLink}
`)
}

function getBaseUrl(data) {
    const regex = /(https?:\/\/[^\s]+)/;

    // Extract the link from the text
    const match = data.match(regex);

    // Check if a link was found and retrieve it
    if (match && match.length > 0) {
        return match[0];
    } 
    return "";
}


async function start() {
    await startTunnel()
    console.log('Server started!');
}
start();
