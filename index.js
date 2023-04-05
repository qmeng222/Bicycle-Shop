const http = require("http");
const url = require("url");
const fs = require("fs").promises; // import the promises module from the built-in fs (file system) module
const bicycles = require("./data/data.json");

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
    let html = await fs.readFile("./view/overview.html", "utf-8");

    const bicycle = bicycles.find((bike) => bike.id === id);
    // console.log(bicycle);
    // // {
    // //   id: '2',
    // //   name: 'Hercules Roadeo A50',
    // //   hasDiscount: true,
    // //   discount: 40,
    // //   originalPrice: 1700,
    // //   image: '2.png',
    // //   star: 3
    // // }
    html = html.replace(/<%IMAGE%>/g, bicycle.image);
    html = html.replace(/<%NAME%>/g, bicycle.name);

    let price = bicycle.originalPrice;
    if (bicycle.hasDiscount) price *= (100 - bicycle.discount) / 100;
    html = html.replace(/<%NEWPRICE%>/g, `$${price}`);

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
