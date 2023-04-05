const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  // console.log("Server is now running.")
  if (req.url === "/favicon.ico") return;
  // console.log(req.url); // /bicycle

  console.log(req.headers); // { host: 'localhost:3000', ... }
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
  console.log(pathname, id); // /bicycle 1

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("<h1>Welcome to the bicycle shop!</h1>");
});

server.listen(3000);
