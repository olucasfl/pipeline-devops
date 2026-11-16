const http = require("http");
const fs = require("fs");
const path = require("path");

const pasta = path.resolve(process.argv[2]);
const porta = Number(process.argv[3]);

const tipos = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".txt": "text/plain" };

const seguranca = {
  "Content-Security-Policy": "default-src 'self'",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
};

http
  .createServer((req, res) => {
    const nome = req.url === "/" ? "index.html" : req.url.split("?")[0];
    fs.readFile(path.join(pasta, nome), (erro, dados) => {
      if (erro) {
        res.writeHead(404, seguranca);
        return res.end("Nao encontrado");
      }
      res.writeHead(200, { ...seguranca, "Content-Type": tipos[path.extname(nome)] });
      res.end(dados);
    });
  })
  .listen(porta);
