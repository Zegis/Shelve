const fs = require('fs');

exports.route = function(req, res)
{

    if(req.url == '/' && req.method == "GET")
    {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        fs.createReadStream('.\\views\\index.html').pipe(res);
    }

    return;
}