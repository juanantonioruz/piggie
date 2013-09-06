// var ey=require("./node2");
// console.log(ey);
var my_cljs_lib=require("./src/cljs-demo/hello");
//console.log(my_cljs_lib);
my_cljs_lib.example.hello();
my_cljs_lib.cljs_demo.hello.examplecallback();

// this way don't work!
//var other=require("./node2");
//console.log(other);

//other.example.hello("asda");

