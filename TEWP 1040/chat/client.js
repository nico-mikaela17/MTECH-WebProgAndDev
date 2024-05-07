const net = require("net");

const client = net.createConnection(3000, () => {
  console.log("connected");
  // client.write(`Hello Server`);
});

client.setEncoding("utf-8");
process.stdin.setEncoding("utf-8");

client.on("data", (data) => {
  console.log(`Received from server: ${data}`);
});
client.on("error", (err) => {
  console.error("Error connecting to server:", err.message);
});

process.stdin.on("data", (data) => {
  if (data.toLowerCase().trim() === "exit") {
    client.end();
    process.exit();
  } else {
    //write data to the client AKA server
    client.write(data);
  }
});
