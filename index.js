const http = require("http");
const url = require("url");
const fs = require("fs").promises; // import the promises module from the built-in fs (file system) module

const server = http.createServer(async (req, res) => {
  // console.log("Server is now running.")
  if (req.url === "/favicon.ico") return;
  // console.log(req.url); // /bicycle

  // console.log(req.headers); // { host: 'localhost:3000', ... }
  // const myUrl = new URL(req.url, "http://localhost:3000/");
  const myUrl = new URL(req.url, `http://${req.headers.host}/`);

  // console.log(myUrl);
  // // URL {
  // //   href: 'http://localhost:3000/bicycle?id=1',
  // //   origin: 'http://localhost:3000',
  // //   protocol: 'http:',
  // //   username: '',
  // //   password: '',
  // //   host: 'localhost:3000',
  // //   hostname: 'localhost',
  // //   port: '3000',
  // //   pathname: '/bicycle',
  // //   search: '?id=1',
  // //   searchParams: URLSearchParams { 'id' => '1' },
  // //   hash: ''
  // // }
  const pathname = myUrl.pathname;
  const id = myUrl.searchParams.get("id");
  // console.log(pathname, id); // /bicycle 1

  // console.log(req.url);
  // // /bicycle?id=0
  // // /index.css
  // // /0.png
  // // /icons.svg

  if (pathname === "/") {
    const html = await fs.readFile("./view/bicycles.html", "utf-8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  } else if (pathname === "/bicycle" && id >= 0 && id <= 5) {
    const html = await fs.readFile("./view/overview.html", "utf-8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  } else if (/\.(png)$/i.test(req.url)) {
    const image = await fs.readFile(`./public/images/${req.url.slice(1)}`);
    res.writeHead(200, { "Content-Type": "image/png" });
    res.end(image);
  } else if (/\.(css)$/i.test(req.url)) {
    const css = await fs.readFile("./public/css/index.css");
    res.writeHead(200, { "Content-Type": "text/css" });
    res.end(css);
  } else if (/\.(svg)$/i.test(req.url)) {
    const svg = await fs.readFile(`./public/images/icons.svg`);
    res.writeHead(200, { "Content-Type": "image/svg+xml" });
    res.end(svg);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end(`<div><h1>File Not Found</h1></div>`);
  }
});

server.listen(3000);
