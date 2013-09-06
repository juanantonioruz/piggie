console.log("my_api.js");
var db={};
db.item="";
db.values=function(_string_){
    db.item="loadign_"+_string_;
    return this;
};
db.done=function(_fn_){
    _fn_(db.item);

};

var api={hello:"ey ",  db:db};
module.exports=api;

// your pretended chain calls
//  db.values("inventory").done(function(item) {
//    console.log(item);
// });

