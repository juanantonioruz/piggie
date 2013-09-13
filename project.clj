(defproject piggie "0.1.0-SNAPSHOT"
  :description "piggie project"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.4.0"]
                 [org.clojure/core.async "0.1.0-SNAPSHOT"]
                 [com.cemerick/piggieback "0.1.0"]
                 [com.cemerick/clojurescript.test "0.0.5-SNAPSHOT"]
                 [org.clojure/clojurescript "0.0-1586"]
                 [org.clojure/data.zip "0.1.1"]
                 ]
  :hooks [leiningen.cljsbuild]
  :plugins [[lein-cljsbuild "0.3.0"][org.bodil/lein-noderepl "0.1.10"]]
  
  :profiles {:1.5 {:dependencies [
                                  [org.clojure/clojure "1.5.1"]
                                  ]}
             :dev {:dependencies [
                                  
                                  [com.cemerick/piggieback "0.0.4"]
                                  [org.bodil/cljs-noderepl "0.1.10"]]}

             }
  :cljsbuild {:builds  [{;; clojurescript source code path
                         :source-paths ["src"]

                         ;; Google Closure Compiler options
                         :compiler {;; the name of emitted JS script file
                                        ;                           :output-to "piggieback_browser.js"
                                    :output-to "node2.js"
                                        ;                           :externs ["node_modules/jasmine-node/lib/jasmine-node/jasmine-1.3.1.js"]
                                                                 :target :nodejs
                                    ;; minimum optimization
                                    :optimizations :whitespace
                                    ;; prettyfying emitted JS
                                    :pretty-print true}}]
              :test-commands {"unit-tests" ["phantomjs" "node2.js"]}}
  :repl-options {:nrepl-middleware [cemerick.piggieback/wrap-cljs-repl]}
  :repositories {"sonatype-oss-public" "https://oss.sonatype.org/content/groups/public/"}

  )
