const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => 
{
    if(req.url == '/')
    {
        require('./controllers/HomeController.js').route(req,res);
    }
    else if(req.url.indexOf('content') > 0)
    {
        let ext = req.url.split('.')[1];

        if(ext === 'css')
        {
            res.setHeader('Content-Type', 'text/css');
        }
        else
        {
            res.setHeader('Content-Type','image/png');
        }

        res.statusCode = 200;
        let readStream = fs.createReadStream(__dirname + req.url);
        readStream.on('error', (error) => {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.write('404 not found');
            res.end();
        })
        readStream.pipe(res);
    }
    else {
        res.statusCode = 400;
        res.end();
    }
    return;
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})