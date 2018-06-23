const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => 
{
    if(req.url.indexOf('img') > 0)
    {
        res.statusCode = 200;
        res.setHeader('Content-Type','image/png');
        
        let readStream = fs.createReadStream(__dirname + req.url);
        readStream.on('error', (error) => {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.write('404 not found');
            res.end();
        })
        readStream.pipe(res);
    }
    else if(req.url.indexOf('content') > 0)
    {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/css');
        let readStream = fs.createReadStream(__dirname + req.url);
        readStream.on('error', (error) => {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.write('404 not found');
            res.end();
        })
        readStream.pipe(res);
    }
    else if(req.url == '/')
    {

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        fs.createReadStream('view\\index.html').pipe(res);
    }
    return;
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})