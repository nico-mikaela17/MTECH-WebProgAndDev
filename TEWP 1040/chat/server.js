const net = require("net");
const fs = require("fs");

//make list of clients when they connect to server
let clients = [];
let clientId = 1;

const server = net
  .createServer((client) => {
    //Send a welcome message to the newly connected client
    client.write("Welcome to the chat room!");

    //Uniquely identify every new client connection
    client.clientId = clientId++;
    clients.push(client);

    // Notify other clients about the new connection
    clients.forEach((single) => {
      if (single !== client) {
        single.write(`Client ${client.clientId} has joined the chat`);
        console.log(`Client ${client.clientId} has joined the chat`);
      }
    });

    client.setEncoding("utf-8");

    //listening to what the client has to say
    client.on("data", (data) => {
      let date = new Date();
      let hour = date.getHours();
      let minutes = date.getMinutes();
      let message = `${hour}:${minutes} - Client ${client.clientId}: ${data}\n`;

      //log all the convo in the server
      console.log(`Client ${client.clientId}: ${data}`);

      //Log the message to chat.log
      fs.appendFile("chat.log", message, (err) => {
        if (err) throw err;
      });
      // Close connection if client sends "exit"
      if (data.trim() === "exit") {
        client.end();
      } else {
        //Forward the same message to all clients
        clients.forEach((single) => {
          //Rebroadcast the client’s message to all clients (excluding the client that sent the message), include the name of the client that sent the message
          if (single !== client) {
            single.write(`Client ${client.clientId}: ${data}`);
          }
        });
      }
    });

    client.on("end", () => {
      //When a client disconnects your server should remove the client from the list of connected clients
      clients.splice(clients.indexOf(client), 1);
      console.log(`Client ${client.clientId} disconnected`);
      // Notify other clients about the disconnection
      clients.forEach((c) => {
        c.write(`Client ${client.clientId} has disconnected\n`);
      });
    });

    // Error handling
    client.on("error", (err) => {
      console.error(`Client ${client.clientId} error: ${err.message}`);
      client.end(); // Close connection on error
    });
  })
  .listen(3000, () => {
    console.log("Listening on port 3000");
  });

//FIXME: Log the connection message to a chat.log file

//FIXME: Log the disconnection message to chat.log
