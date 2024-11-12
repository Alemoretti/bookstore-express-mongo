import http from 'http';

const PORT = 3000

const routes = {
  "/": "Node Course",
  "/books": "Books",
  "/authors": "Authors",
}

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" })
  res.end(routes[req.url])
})

server.listen(PORT, () => {
  console.log("Server is running on port 3000")
})