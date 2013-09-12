var fs=require("fs");
var xmldom=require('xmldom');
var xpath = require('xpath');
var DOMParser = xmldom.DOMParser;


/**  */
function try_to_remove_file( arg ){
    try{
        fs.unlinkSync(arg);                                              
    }catch(e){
        //logging.dbg("clean test file resources");
    };
};
exports.try_to_remove_file=try_to_remove_file;
function try_to_remove_dir( arg ){
    try{
        var files=fs.readdirSync(arg);
        for(var f=0; f<files.length; f++){
            var file=files[f];
            var file_name=arg+"/"+file;
            if(fs.statSync(file_name).isFile())
                try_to_remove_file(file_name);
            else
                try_to_remove_dir(file_name);
        };
        fs.rmdirSync(arg);                                              
    }catch(e){
       // logging.dbg("clean test dir resources");
    }

};

function createXMLDocFromString(data){
    var doc = new DOMParser().parseFromString(data,'text/xml');
    return doc;
};

exports.createXMLDocFromString=createXMLDocFromString;
exports.try_to_remove_dir=try_to_remove_dir;

exports.mkdirSync=fs.mkdirSync;
exports.writeFileSync=fs.writeFileSync;
exports.readdirSync=fs.readdirSync;
exports.readFileSync=fs.readFileSync;
