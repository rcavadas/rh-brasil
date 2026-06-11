import http from 'node:http';

const port = Number(process.env.PORT ?? 3000);

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'application/json; charset=utf-8' });
  res.end(
    JSON.stringify({
      service: 'rh-api',
      status: 'ok',
      method: req.method,
      path: req.url,
    }),
  );
});

server.listen(port, '0.0.0.0', () => {
  console.log(`rh-api listening on ${port}`);
});
