# piggie

A cljs-node app.
Working with node-repl  https://github.com/bodil/cljs-noderepl  and piggieback https://github.com/cemerick/piggieback


! new command line to compile to a specific file   
It must be running the ncljsc server on port 4242   
'''supervisor -w src/foo.cljs -n exit -x ncljsc -- --client 4242 -c -p src/foo.cljs > compiled.js'''


Working cljscript environment to develop nodejs libs

###Required:   
$ npm install -g clojure-script   
$ npm install -g supervisor   
$ npm install -g nodemon   

#FIRST start nrepl from emacs, otherwise the nrepl cljs open in read mode and it doesnt let C-C C-K and others   
+ open emacs, cd into project and nrepl-jack-in
+ insert into nrepl (require '[cljs.repl.node :as node])(node/run-node-nrepl) 
+ now we can evaluate cljs files with C-C+C-K keys and the rest of nrepl keys 

$ ncljsc --server 4242   
$ git clone git@github.com:juanantonioruz/piggie.git   
$ cd ../piggie  
$ supervisor -w src/cljs-demo/hello.cljs -n exit -x ncljsc -- --client 4242 --compile src/cljs-demo/hello.cljs
SWITCH  
$ nodemon jasmine-test.js  
OR
$ supervisor -w src/cljs-demo/hello.js,jasmine_node_tests -n exit -x jasmine-node jasmine_node_tests/

My dev environment    
https://dl.dropboxusercontent.com/u/8688858/node_cljs_integration.mov




On osX
rlwrap -r -m  '\"' -b "(){}[],^%3@\";:'" lein trampoline noderepl

in one terminal run: 

lein trampoline cljsbuild auto

in other terminal listen browser

(require 'cljs.repl.browser)

(cemerick.piggieback/cljs-repl
  :repl-env (cljs.repl.browser/repl-env :port 9000))


if you want to work directly with the js generated you have to quit :target :nodejs and :optimizations :simple also... besides to adapt your source-paths and output-to properties in project.clj

## Usage 


... on emacs ...    
M-x nrepl-jack-in

... on nrepl ...   
(require '[cljs.repl.node :as node])   
(node/run-node-nrepl)   

... on node-cljs-nrepl ...   
(js/require "./my_api")   
(def http (js/require "http"))   




## License

Copyright © 2013 [@tangrammer](https://twitter.com/tangrammer)

Distributed under the Eclipse Public License, the same as Clojure.
