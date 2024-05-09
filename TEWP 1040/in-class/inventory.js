const http = require("http");
const fs = require("fs");
const path = require("path");

const data = require("./data/inventory.json");

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/json" });
    res.end(JSON.stringify(data));
  })
  .listen(3000, () => {
    console.log("listening on port 3000");
  });
