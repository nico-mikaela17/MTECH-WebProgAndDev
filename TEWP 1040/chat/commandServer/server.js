const net = require("net");
const fs = require("fs");

//-----------DONE----------------------
//make list of clients when they connect to server
class Client {
  constructor(socket, id) {
    this.socket = socket; //client connection
    this.id = id;
    this.username = `User${id}`; // Default username
  }
}

//way to organize data AKA list of clients
let clients = new Set();
//set the initial id
let clientId = 1;

const server = net.createServer((client) => {
  const user = new Client(client, clientId++);
  // Add the new client to the list of connected clients
  clients.add(user);
  console.log(`${user.username} has joined the chat`);

  //Send a welcome message to the newly connected client
  client.write("Welcome to the chat room!");

  // Notify other clients about the new connection
  clients.forEach((otherUser) => {
    if (otherUser !== user) {
      // Send a message to other clients notifying them about the new user
      otherUser.socket.write(`${user.username} has joined the chat\n`);
    }
  });
  client.setEncoding("utf-8");
  //-----------DONE----------------------

  //listening to what the client has to say
  client.on("data", (data) => {
    //log all the convo in the server
    console.log(`${user.username}: ${data}`);
    let date = new Date();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let message = `${hour}:${minutes} - ${user.username}: ${data}\n`;

    //Log the message to chat.log
    fs.appendFile("chat.log", message, (err) => {
      if (err) throw err;
    });

    // Close connection if client sends "exit"
    if (data.trim() === "exit") {
      // Notify other clients about the disconnection
      clients.forEach((otherUser) => {
        if (otherUser !== user) {
          otherUser.socket.write(`${user.username} has left the chat\n`);
        }
      });
      clients.delete(user);

      client.end();

      // Notify other clients about the disconnection
    }
    //Your server should send an informative error message if the command fails for any reason (incorrect number of inputs, invalid username, trying to whisper themselves etc.)
    //If there is no error then a private message containing the whisper sender’s name as well as the whispered message should be sent to the indicated user
    else if (data.trim().startsWith(`/whisper`)) {
      handleWhisperCommand(user, data);
    }
    // else if (data.trim().startsWith(`/username`)) {
    //   client = input;
    //   const newUsername = data.trim().substring(9);
    //   console.log(
    //     `Client ${client.clientId} changed username to ${newUsername}`
    //   );
    // } else if (data.trim() === "/kick") {
    // } else if (data.trim() === "/clientlist") {
    //   client.write(`Connected clients: ${clients}`);
    // }
    else {
      //Rebroadcast the client’s message to all clients (excluding the client that sent the message), include the name of the client that sent the message
      clients.forEach((otherUser) => {
        if (otherUser !== user) {
          otherUser.socket.write(`${user.username}: ${data}`);
        }
      });
    }
  });

  client.on("end", () => {
    //When a client disconnects your server should remove the client from the list of connected clients
    clients.delete(user);
    console.log(`${user.username} has left the chat`);
    // Notify other clients about the disconnection
    clients.forEach((otherUser) => {
      otherUser.socket.write(`${user.username} has left the chat`);
    });
  });

  // Handle errors
  client.on("error", (err) => {
    console.error("Client error:", err);
  });
});

// Handle server errors
server.on("error", (err) => {
  console.error("Server error:", err);
});

server.listen(3000, () => {
  console.log("Listening on port 3000");
});

//FIXME: Log the disconnection message to chat.log

function handleWhisperCommand(client,user,sender, data) {
  // if (!clients || !data.lenght) {
  //   sender.write(
  //     `Error: Invalid usage. Correct format: /whisper <username> <message>`
  //   );
  //   return;
  // }
  /// Check if target user exists
  const targetUser = user.username;
  if (!targetUser) {
    client.write(`Error: User "${targetUser}" not found.`);
    return;
  }
  if (targetUser === user.username) {
    client.write(`Error: You cannot whisper to yourself.`);
    return;
  }
  const senderName = user.username;
  const fullWhisper = `Whisper from ${senderName}: ${data}`;

  // Send the whisper to the target user
  targetUser.write(fullWhisper);
}
