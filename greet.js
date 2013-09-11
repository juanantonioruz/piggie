//require('clojure-script')(4242);
var mori = require("mori");

var base=require('./compiled.js');
var foo = base.foo;

//console.log(foo.greet('ClojureScript developerewe!', 'Mr.'));
//console.log(base.ey.bar.title("genial"));
console.log(foo.bridge("./"));

