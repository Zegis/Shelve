const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => 
{

    if(req.url.includes('.css'))
    {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/css');
        fs.createReadStream("content\\main.css").pipe(res);
    }
    else if(req.url == '/' || req.url.includes('.html'))
    {

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        fs.createReadStream("view\\index.html").pipe(res);
    }
    return;
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})