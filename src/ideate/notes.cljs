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



(ideate/filter-condition-collection-into-collection string-files fn_filters)
