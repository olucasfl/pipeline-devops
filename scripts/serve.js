// Servidor estatico usado no DAST: serve a pasta dist/ com cabecalhos de seguranca.
const http = require("http");
const fs = require("fs");
const path = require("path");

const dir = path.resolve(process.argv[2] || "dist");
const port = Number(process.argv[3] || 8080);

const tipos = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

const cabecalhos = {
  "Content-Security-Policy": "default-src 'self'",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Cache-Control": "no-store",
};

http
  .createServer((req, res) => {
    const url = decodeURIComponent(req.url.split("?")[0]);
    const arquivo = path.join(dir, url === "/" ? "index.html" : url);
    if (!arquivo.startsWith(dir)) {
      res.writeHead(403, cabecalhos);
      return res.end("Proibido");
    }
    fs.readFile(arquivo, (erro, dados) => {
      if (erro) {
        res.writeHead(404, cabecalhos);
        return res.end("Nao encontrado");
      }
      const tipo = tipos[path.extname(arquivo)] || "application/octet-stream";
      res.writeHead(200, { ...cabecalhos, "Content-Type": tipo });
      res.end(dados);
    });
  })
  .listen(port, () => console.log(`Servindo ${dir} em http://localhost:${port}`));
