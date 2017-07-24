var http = require('http')
var https = require('https')
var url = require('url')
var fs = require('fs')

const options = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt')
};

https.createServer (options, function (req, res) {
    var q = url.parse(req.url, true);
    console.log(q);
    var qdata = q.query;
    var filename = 'userData';
    if (qdata.name && qdata.addr) {
        fs.appendFile(filename,qdata.name.toString()+','+qdata.addr.toString()+'\n',function(err) {
                if(err) {
                        console.log('write fail');
                } else {
                        console.log('write success');
                }
        });

        res.writeHead(200, {'Content-Type':'text/html'});
        res.write("The date and time are currently: " + Date());
    }
    if (q.pathname=="/search") {
        fs.readFile(filename, function (err, data) {
                console.log(data.toString());
                res.writeHead(200, {'Content-Type':'text/plain'});
                res.write(data.toString());
        });
    }
    res.end();
}).listen(8000);