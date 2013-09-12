(ns ideate.ideate

  (:require 
   [ideate.util :as util]
   [ideate.fs :as fs]
   [ideate.xml :as xml]
   [ideate.fs.dir :as dir-configs]
   )
  (:require-macros [ideate.mymacro :as mymacro])
  
  )

(defn ^:export copy-file [uri dest-uri]
  "copy a file, the dest-uri must contain the absolute name of the new file "
  (let [the-content (.readFileSync fs/fs uri)]
    (.writeFileSync fs/fs dest-uri the-content)
    )
  )

(defn ^:export create-file [uri]
  "create file"
  (let [the-dir (fs/extract-dir-from-uri-file uri)]
    (if (fs/is-dir? the-dir)
     (.writeFileSync fs/fs uri)
     (str "ERROR: The directory for this url " the-dir " doesnt exist! You have to create it before")
     ))
  )
(defn ^:export list-dir
  "the path must end in hash"
  ([] (list-dir "./"))
  ([dir]
     "its considered default directory list the one who has his system-files and readme hidden"
     (list-dir dir [(dir-configs/default-conditions :hide-readme) (dir-configs/default-conditions :hide-system-files)]))
  
  ( [dir filters  ]
      (list-dir dir filters [((dir-configs/default-transformations :add-slash-if-folder) (fs/check-correct-dir-format dir))])
      )
  ( [dir filters transformations ]
      (let [
            the-dir (fs/check-correct-dir-format dir)
            files (.readdirSync fs/fs the-dir)
            res (mymacro/recursive-apply  filter filters files)
            ]
        (mymacro/recursive-apply  map  transformations  res)
        ))
  )

(defn ^:export move
  [uri, dest-uri]
  "move file or folder"
  (.renameSync fs/fs uri dest-uri)
  )

(defn ^:export remove
  [uri]
  "remove file or folder"
  (if-not (fs/is-dir? uri)
     (.unlinkSync fs/fs uri)
     (let [contents (list-dir uri)]
       (if-not (seq contents)
         (.rmdirSync fs/fs uri)
         (do
           (doseq   [item contents]
             (remove (str (fs/check-correct-dir-format uri) item)))
           (remove uri)
           )
         )
       )
     )
  
  )

(defn -loadFile [uri]
  (.readFileSync fs/fs uri)
  )

(defn ^:export loadXML [uri]
  "Load XML file contents"
  (xml/parse-xml (str (-loadFile uri)))
  )

(defn ^:export saveXML [uri, xmlDoc]
  "Save XML string contents"
  (.writeFileSync fs/fs uri xmlDoc)
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
  (ideate.mymacro/unless (= 1 2) (print "jjj") "jaja")
  )

