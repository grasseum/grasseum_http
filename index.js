 
var compt = require("compts");
const http = require('http');

var url = require("url");
exports.run_server = function(){
    const requestListener = function (req, res) {
        console.log(req.headers,"req.headers");
        console.log(req.rawHeaders,"req.rawHeaders");
        console.log(req.url,":req.url");
        console.log(url.parse(req.url),":url.parse");
      res.writeHead(200);
      res.end('Hello, World!');
    }
    
    const server = http.createServer(requestListener);
    server.listen(8080,'127.0.0.1',function(err){
        console.log(err,"err");
    });
}