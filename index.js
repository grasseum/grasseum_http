const grasseumCore = require("grasseum_core"); 
var compt = require("compts");
const http = require('http');

var url = require("url");
exports.run_server = function( grasseum_stream,action ){
    let default_port = 8080;
    var getcwd = grasseumCore.terminal().getCwdParameter(action.argv.argv);

    if(compt._.has( getcwd,"port" )){
        default_port = parseInt(getcwd["port"]);
    }

    const requestListener = function (req, res) {
     
      const remove_slash = url.parse(req.url).pathname.replace(/\//g,"");

     
  
      
      grasseum_stream.execute_pipe_name_only(remove_slash,action);
      grasseum_stream.prepare_execute(grasseum_stream.getListLoad()["execute"]);
      res.writeHead(200);
      res.end('Hello, Your stream is now working, this is a trial feature, new improvements will come along the way.');
    }
    
    const server = http.createServer(requestListener);
    server.listen(default_port,'127.0.0.1',function(err){
        console.log(err,"err");
    });
}