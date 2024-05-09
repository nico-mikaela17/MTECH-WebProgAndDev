const http = require("http");
const fs = require("fs");
const path = require("path");

http
  .createServer((req, res) => {
    if (req.url === "/") {
      fs.readFile("./public/index.html", "utf-8", (err, html) => {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
      });
    } else if (req.url.match(/.css$/)) {
      const cssPath = path.join(__dirname, "public", req.url);
      const fileStream = fs.createReadStream(cssPath, "utf-8");

      res.writeHead(200, { "Content-Type": "text/css" });

      fileStream.pipe(res);
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 File not found");
    }
  })
  .listen(3000, () => {
    console.log("listening on port 3000");
  });
