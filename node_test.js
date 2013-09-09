// this is the cljs compiled
var my_cljs_lib=require("./src/cljs-demo/hello");
console.log(my_cljs_lib.cljs_demo.hello.my_function("BILL "));


//and now from JAsmine

//console.log(my_cljs_lib);

my_cljs_lib.example.hello();
my_cljs_lib.cljs_demo.hello.examplecallback();
console.log(my_cljs_lib.juan.greeting("juan"));





// this way don't work!
//var other=require("./node2");
//console.log(other);

//other.example.hello("asda");

