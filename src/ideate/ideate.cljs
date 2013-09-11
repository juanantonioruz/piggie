(ns ideate.ideate
  (:require 
   [ideate.util :as util]
   [ideate.fs :as fs]
   [ideate.fs.dir :as dir-configs]
   )
  
  
  )
(ns ideate.fs.dir
   (:require 
   [ideate.util :as util]
   [ideate.fs :as fs]))
(def default-conditions {
                         :hide-readme (fn  [file-name]   (not (== file-name "README.md")))
                         :hide-system-files (fn  [file-name]   (not (util/is-system-file? file-name)))
                         })

(def default-transformations {
                              :add-slash-if-folder (fn [dir]
                                                (fn [it] (if (fs/is-dir? (str dir it)) (str it "/") it ))
                                                )
                              
                              })

(ns ideate.ideate
  (:require 
   [ideate.util :as util]
   [ideate.fs :as fs]
   [ideate.fs.dir :as dir-configs]
   )
  
  
  )



(defn ^:export list-dir
  "the path must end in hash"
  ([] (list-dir "./"))
([dir]
       "its considered default directory list the one who has his system-files and readme hidden"
       (list-dir dir [(dir-configs/default-conditions :hide-readme) (dir-configs/default-conditions :hide-system-files)]))
  
   ( [dir filters  ]
       (list-dir dir filters [((dir-configs/default-transformations :add-slash-if-folder) dir)])
)
  ( [dir filters transformations ]
       (let [
             files (.readdirSync fs/fs dir)
             res (ideate.my-macro/recursive-apply  filter filters files)
             ]
         (ideate.my-macro/recursive-apply  map  transformations  res)
         ))
  )



(comment
  (require '[cljs.repl.node :as node])(node/run-node-nrepl)
  )

(comment
  "; here maybe we can create a macro to define the conditions
the positive condition (without affecting) and negative
")
(comment defn filter-this-string [])
(comment
  "to work on brepl take a look on http://stackoverflow.com/questions/12337509/how-can-macros-be-evaluated-using-the-clojurescript-repl"
  defn mira-a-ver []
  (ideate.my-macro/unless (= 1 2) (print "jjj") "jaja")
  )
