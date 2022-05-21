const {has,each} = require("structkit");
const {logRed} = require("grasseum_console");

const {appServer} = require("fornetserve");
const url = require("url");

exports.routedValidation  = function (routeConfig,route,method,config) {
    let valid = false;
    if ( has(config,"moduleName") ){
        valid = true;
    }else{
        valid = false;
        logRed("Error: moduleName not exist in route:"+route)
    }

    if (valid){
        routeConfig.push({
            route,
            method,
            streamName:config["moduleName"]

        })
    }
};


exports.http_align  = function (routeConfig ,grasseum_stream,action){
    const apps = appServer();
    each(routeConfig , (k,v)=>{
        if ( v.method ==="get"){
            apps.get(v.route , (req, res) =>{

                grasseum_stream.execute_pipe_name_only(v.streamName, action);
                grasseum_stream.prepare_execute(grasseum_stream.getListLoad().execute);
                res.writeHead(200);
                res.end('Route Get:'+v.route);
            });
        }
        if ( v.method ==="post"){
            apps.post(v.route , (req, res) =>{

                grasseum_stream.execute_pipe_name_only(v.streamName, action);
                grasseum_stream.prepare_execute(grasseum_stream.getListLoad().execute);
                res.writeHead(200);
                res.end('Route Post:'+v.route);
            });    
        }
    });
    return apps;
}