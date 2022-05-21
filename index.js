const grasseumConsole = require("grasseum_console");
const structkit = require("structkit");
const core = require("./core");
const {https,http} = require("fornetserve");

let routeConfig=[];
exports.http_route = function () {
    routeConfig = [];
    return {
        get:(route,config)=>{
            core.routedValidation( routeConfig,route,"get",config );
        },  
        post:(route,config)=>{
            core.routedValidation( routeConfig,route,"post",config );
        }
    } 
}
exports.run_server = function (grasseum_stream, action) {

    let default_host = '0.0.0.0';
    let default_port = 4040;
    let serverTypes = "http";
    const getcwd = grasseumConsole.getCwdParameter(action.argv.argv);

    if (structkit.has(getcwd, "port")) {

        default_port = parseInt(getcwd.port);

    }
    if (structkit.has(getcwd, "host")) {

        default_host = getcwd.host;

    }
    if (structkit.has(getcwd, "servertype")) {

        serverTypes = getcwd.servertype;

    }


    const http_align = core.http_align(routeConfig ,grasseum_stream,action);

    if (serverTypes==="http")
        http(http_align,{host:default_host,port:default_port})
    if (serverTypes==="https")
        https(http_align,{host:default_host,port:default_port})
    if (serverTypes==="http_and_https"){
        http(http_align,{host:default_host,port:default_port})
        https(http_align,{host:default_host,port:default_port})
    }

};
