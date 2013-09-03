(defproject piggie "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
    :dependencies [[org.clojure/clojure "1.5.0"]
                 [org.clojure/clojurescript "0.0-1859"]
                 [org.bodil/cljs-noderepl "0.1.10"]]
      :hooks [leiningen.cljsbuild]
      :plugins [[lein-cljsbuild "0.3.0"][org.bodil/lein-noderepl "0.1.10"]]
      
      
  :cljsbuild {:builds
              [{;; clojurescript source code path
                :source-paths ["src/cljs-demo"]

                ;; Google Closure Compiler options
                :compiler {;; the name of emitted JS script file
                           :output-to "node.js"
                           :target :nodejs
                           ;; minimum optimization
                           :optimizations :simple
                           ;; prettyfying emitted JS
                           :pretty-print true}}]}
:repl-options {:nrepl-middleware [cemerick.piggieback/wrap-cljs-repl]}
            )
