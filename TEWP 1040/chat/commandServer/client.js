const net = require("net");

const client = net.createConnection(3000, () => {
  //Console.log a ‘connected’ message when it has successfully connected to the server
  console.log(
    `Connected to server.\nType your message below.Type 'exit' to disconnect.`
  );
});

client.setEncoding("utf-8");
process.stdin.setEncoding("utf-8");

client.on("data", (data) => {
  //Console.log any messages received from the server
  console.log(`${data}`);
});
client.on("error", (err) => {
  console.error("Error connecting to server:", err.message);
});

process.stdin.on("data", (data) => {
  data = data.trim();
  if (data.toLowerCase() === "exit") {
    client.write(data);
    console.log("Disconnecting from server...");
    client.end();
    process.exit();
  } else if (data.toLowerCase().startsWith(`/kick`)) {
    // Prompt the user to enter the username to kick
    console.log("Enter the username to kick:");
    process.stdin.once("data", (username) => {
      username = username.trim();
      // Send the complete kick command to the server
      client.write(`/kick ${username}`);
    });
  } else if (data.toLowerCase().startsWith(`/clientlist`)) {
    client.write(data);
  } else if (data) {
    client.write(data);
  } else {
    console.log("Please enter a valid message or 'exit' to quit.");
  }
});
