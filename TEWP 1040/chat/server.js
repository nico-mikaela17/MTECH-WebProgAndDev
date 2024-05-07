const net = require("net");
const fs = require("fs");
//make list of clients when they connect to server
let clients = [];
let clientId = 1;

const server = net
  .createServer((client) => {
    client.write("Welcome to the chat room!");

    //way to identify clients
    client.clientId = clientId++;
    clients.push(client);

    client.setEncoding("utf-8");
    //listening to what the client has to say
    client.on("data", (data) => {
      let date = new Date();
      let hour = date.getHours();
      let minutes = date.getMinutes();
      let message = `${hour}:${minutes} - Client ${client.clientId}: ${data}\n`
      fs.appendFile("chatLog.txt", message, (err) => {
        if (err) throw err;
      }); //forward the same message to all clients
      clients.forEach((single) => {
        if (single !== client) {
          single.write(`Client ${client.clientId}: ${data}`);
        }
      });
    });
    client.on("end", () => {
      // Remove the client when it disconnects
      clients.splice(clients.indexOf(client), 1);
      console.log(`Client ${client.clientId} disconnected`);
    });
  })
  .listen(3000, () => {
    console.log("Listening on port 3000");
  });

//FIXME: create file with log of all messages
