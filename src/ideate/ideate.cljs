(ns ideate.ideate
  ;(:require-macros [ideate.my-macro :as my-macro])
  (:require 
   [ideate.util :as util]
   [ideate.fs :as fs])
  
  )





(defn add-folder-char
  "this fn add a hash to the name of the file in case of this is a directory"
  [current_dir, files-collection]
  (map (fn[it] 
         (if (fs/is-dir? (str current_dir it))
           (str it "/")
           it
           )
         ) files-collection)
  )
(comment
  "; here maybe we can create a macro to define the conditions
the positive condition (without affecting) and negative
")
(comment defn filter-this-string [])
(defn mira-a-ver []
  (ideate.my-macro/unless (= 1 2) (print "jjj") "jaja")
  )

(def default-conditions {
                         :hide-readme (fn  [file-name]   (not (== file-name "README.md")))
                         :hide-system-files (fn  [file-name]   (not (util/is-system-file? file-name)))
                         })

(defn ^:export list-dir
   ([] (list-dir "./")) (
    [dir]
      "its considered default directory list the one who has his system-files and readme hidden"
      (list_dir dir [(default-conditions :hide-readme) (default-conditions :hide-system-files)]))
  ( [dir conditions]
      (let [
            files (.readdirSync fs/fs dir)
            string-files (map (fn [item] item) files)
            res (util/apply-filter-conditions-to-collection  conditions string-files)
            ]
        (add-folder-char dir res)
        ))
  
  )








(comment
  (require '[cljs.repl.node :as node])(node/run-node-nrepl)
  )
