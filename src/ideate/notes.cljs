(ns ideate.notes
  (:require 
   [ideate.util :as util]
    [ideate.ideate :as ideate]))

(def string-files '(".DS_Store" ".git" ".gitignore" ".repl" "README.md" "doc" "jasmine_node_tests" "my_api.js" "node_f.js" "node_modules" "node_test.js" "out" "package.json" "piggieback_browser.js" "project.clj" "resources" "src" "target" "test"))

(def fn_filters [
                 (fn  [s]   (not (== s "README.md")))
                 (fn  [s]   (not (util/is-system-file? s)))
    ;              #(not (util/is-system-file? %))
                  ])

(def actual-files-in-root '("compiled.js" "doc" "greet.js" "index.html" "jasmine_node_tests" "my_api.js" "node_f.js" "node_modules" "node_test.js" "out" "package.json" "piggieback_browser.js" "pom.xml" "project.clj" "resources" "runners" "src" "test"))

(defn test-is-dir []
  (map (fn[it] 
                      (if (ideate/is-dir? (str "./" it))
                          (str it "/")
                        it
                          )
                      ) actual-files-in-root)
  )


(ideate/filter-condition-collection-into-collection string-files fn_filters)
