# piggie

A cljs-node app.



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

FIXME

## License

Copyright © 2013 FIXME

Distributed under the Eclipse Public License, the same as Clojure.
