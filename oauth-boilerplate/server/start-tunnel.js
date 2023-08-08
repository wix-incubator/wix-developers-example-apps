require('dotenv').config();
const Client = require("ssh2").Client; // To communicate with Serveo
const Socket = require("net").Socket; // To accept forwarded connections (native module)
const fs = require("fs");





const startTunnel = async () => {
    
    // Create an SSH client
    const conn = new Client();
    const configSSH = {
        remoteHost: "localhost",
        remotePort: 80,
        localHost: "localhost",
        localPort: 8080
    };

    let firstTimePrint = false // since we get to stream.on("data") multi times
    

    conn.on("ready", () => {
      // When the connection is ready
      console.log("Connection to ssh tunnel is ready, server will start soon...");
      // Start an interactive shell session
      conn.shell((err, stream) => {
        if (err) throw err;
        // And display the shell output (Serveo link)
        stream.on("data", data => {
          if(!firstTimePrint){
              const baseUrl = getBaseUrl(data.toString());
              if(baseUrl != ""){
                  firstTimePrint = true;
                  saveUrl(baseUrl);
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
          });
        //console.log("Accept remote connection");
        srcSocket.pipe(remote).pipe(srcSocket);
      });
  })
  // Connect to Serveo
  .connect({
    host: "serveo.net",
    username: process.env.APP_ID,
    privateKey: "",
    tryKeyboard: true,
    keepaliveInterval: 6000, //How often (in milliseconds) to send SSH-level keepalive packets to the server 
    keepaliveCountMax: 180 //How many consecutive, unanswered SSH-level keepalive packets that can be sent to the server before disconnection
  });
  
    
}


function saveUrl(baseUrl) {
    // Get the existing .env content
    const envContent = fs.readFileSync(".env", "utf-8");

    // Replace the existing URL with the new URL in the content
    const updatedEnvContent = envContent.replace(/^URL=.*/m, `URL=${baseUrl}`);
    fs.writeFileSync('.env', updatedEnvContent);
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

startTunnel();