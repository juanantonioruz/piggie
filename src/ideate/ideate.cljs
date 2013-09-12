(ns ideate.ideate

  (:require 
   [ideate.util :as util]
   [ideate.fs :as fs]
   [ideate.xml :as xml]
   [ideate.fs.dir :as dir-configs]
   )
  (:require-macros [ideate.mymacro :as mymacro])
  
  )




(defn ^:export copy [uri dest-uri]
  "copy a file, the dest-uri must contain the absolute name of the new file "
  (let [the-content (.readFileSync fs/fs uri)]
    (.writeFileSync fs/fs dest-uri the-content)
    )
  )


(defn ^:export createFolder [uri]
  "create folder"
  ;(println (str "creating folder " uri))
     (.mkdirSync fs/fs uri)
  )

(defn ^:export createFile [uri]
  "create file"
  (let [the-dir (fs/extract-dir-from-uri-file uri)]
    (if (fs/is-dir? the-dir)
      (.writeFileSync fs/fs uri)
      (util/throw-js-error (str "Houston, we have a problem.\n" (str "ERROR: The directory for this url " the-dir " doesnt exist! You have to create it before")))
     ))
  )

(defn ^:export exception_test []
  (util/throw-js-error "jolin" "cojones")
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

(def node-types {
                 :1 {
                     :get (fn [node]
                        (if-let [first-child (.-firstChild node)]
                          (str (.-data first-child))
                          ""
                          )
                        )
                     :set (fn [node new-value]
                            (if-let [first-child (.-firstChild node)]
                              (set! (.-data first-child) new-value )
                              (let [child (.createTextNode (.-ownerDocument node) new-value)]
                                (set! (.-firstChild node)  child)
                                )
                              )    
                            )
                     :remove (fn [node]
                               (.removeChild (.-parentNode node) node)
                               )
                     
                     }
                 :2 {:get (fn [node] (str (.-value node)))
                     :set (fn [node new-value] (set! (.-value node) new-value ))
                     :remove (fn [node]
                               (.removeAttribute (.-ownerElement node) (.-nodeName node))
                               )
                     }
                 :3 {
                     :get (fn [node] (.toString node))
                     :set (fn [node new-value] (set! (.-value node) new-value ))
                     :remove (fn [node]
                               (set! (.-value node) "" ))
                     }
                 
                 })

(defn ^:export getValue [xml-doc xpath-pattern]
  (if-let [result (xml/select-first-xpath-result xml-doc xpath-pattern)]
    (let [node-type (keyword (.-nodeType result))]
;      (.log js/console (str "--->ESTTTTTTOOO "(.-nodeType result)))
      ((:get (node-type node-types)) result)
      )
    (util/throw-js-error "there's no value for this xpath: " xpath-pattern)
      )
  )


(defn ^:export setValue [xmlDoc xpath-pattern  new-value]
  (if-let [result (xml/select-first-xpath-result xmlDoc xpath-pattern)]
        (let [node-type (keyword (.-nodeType result))]
      ((:set (node-type node-types)) result new-value)
      )
    (util/throw-js-error "there's no value for this xpath: " xpath-pattern)
      )
  )

(defn ^:export removeXML [xmlDoc xpath-pattern]
    (if-let [result (xml/select-first-xpath-result xmlDoc xpath-pattern)]
        (let [node-type (keyword (.-nodeType result))]
      ((:remove (node-type node-types)) result )
      )
    (util/throw-js-error "there's no value for this xpath: " xpath-pattern)
    )
  )

(defn ^:export append [xml-doc new-content]
  (.appendChild xml-doc new-content)
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

