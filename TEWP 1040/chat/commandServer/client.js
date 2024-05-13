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
    console.log("Disconnecting from server...");
    client.end();
    process.exit();
  } else if (data) {
    client.write(data);
  } else {
    console.log("Please enter a valid message or 'exit' to quit.");
  }
});
