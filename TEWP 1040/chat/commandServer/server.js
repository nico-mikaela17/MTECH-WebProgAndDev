const net = require("net");
const fs = require("fs");

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
  client.write(`Welcome to the chat room!\nType your message below.\nType '/w <username>' to whisper.\nType '/username <newUserName>' to update your username.\nType '/kick' to kick someone out.\nType '/clientlist' to know who's on the server.\nType 'exit' to disconnect.`);

  // Notify other clients about the new connection
  clients.forEach((otherUser) => {
    if (otherUser !== user) {
      // Send a message to other clients notifying them about the new user
      otherUser.socket.write(`${user.username} has joined the chat\n`);
    }
  });
  client.setEncoding("utf-8");

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
      console.log("someone is exiting");
      // Notify other clients about the disconnection
      clients.forEach((otherUser) => {
        if (otherUser !== user) {
          otherUser.socket.write(`${user.username} has left the chat\n`);
        }
      });
      clients.delete(user);

      client.end();
    } else if (data.trim().startsWith(`/whisper`)) {
      handleWhisperCommand(user, data);
    } else if (data.trim().startsWith(`/username`)) {
      const newUsername = data.trim().substring(9);
      user.username = newUsername;
      console.log(`${user.username} changed username to ${newUsername}`);
    } else if (data.trim().startsWith("/kick")) {
      const [command, targetUsername] = data.trim().split(" ");

      // Validate inputs
      if (!targetUsername) {
        user.socket.write(
          "Error: Invalid usage. Correct format: /kick <username>"
        );
      } else {
        handleKickCommand(user, targetUsername);
      }
    } else if (data.trim() === "/clientlist") {
      const clientList = Array.from(clients)
        .map((client) => client.username)
        .join(", ");
      client.write(`Connected clients: ${clientList}`);
    } else {
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

//Your server should send an informative error message if the command fails for any reason (incorrect number of inputs, invalid username, trying to whisper themselves etc.)
//If there is no error then a private message containing the whisper sender’s name as well as the whispered message should be sent to the indicated user

function handleWhisperCommand(sender, data) {
  const [command, targetUsername, ...messageParts] = data.trim().split(" ");

  // Validate inputs
  if (!targetUsername || messageParts.length === 0) {
    sender.socket.write(
      "Error: Invalid usage. Correct format: /whisper <username> <message>"
    );
    return;
  }

  // Check if target user exists (you need to implement this logic)
  const targetUser = getUserByUsername(targetUsername);
  if (!targetUser) {
    sender.socket.write(`Error: User "${targetUsername}" not found.`);
    return;
  }

  // Check if sender is trying to whisper to themselves
  if (targetUsername === sender.username) {
    sender.socket.write("Error: You cannot whisper to yourself.");
    return;
  }

  // Construct the whisper message
  const senderName = sender.username;
  const whisperedMessage = messageParts.join(" ");
  const fullWhisper = `Whisper from ${senderName}: ${whisperedMessage}`;

  // Send the whisper to the target user (you need to implement this logic)
  targetUser.socket.write(fullWhisper);
}

function getUserByUsername(username) {
  for (const user of clients) {
    if (user.username === username) {
      return user;
    }
  }
  return null;
}

//FIXME:works but the user kicked still has server working and can type again. We want to end their connection to the server
function handleKickCommand(sender, targetUsername) {
  // Check if target user exists
  const targetUser = getUserByUsername(targetUsername);
  if (!targetUser) {
    sender.socket.write(`Error: User "${targetUsername}" not found.`);
    return;
  }

  // Check if sender is trying to kick themselves
  if (targetUser === sender) {
    sender.socket.write("Error: You cannot kick yourself.");
    return;
  }

  // Send a message to the target user
  targetUser.socket.write(
    `You have been kicked out of the chat by ${sender.username}`
  );

  // Notify other clients about the disconnection
  clients.forEach((otherUser) => {
    if (otherUser !== sender && otherUser !== targetUser) {
      otherUser.socket.write(
        `${targetUser.username} was kicked out of the chat`
      );
    }
  });

  // Log the kick message
  console.log(`${targetUser.username} was kicked by ${sender.username}`);

  // Remove the target user from the clients
  clients.delete(targetUser);
  targetUser.socket.destroy();
}
