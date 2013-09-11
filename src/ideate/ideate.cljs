(ns ideate.ideate
  (:require 
            [ideate.util :as util])
  )

(def fs (js/require "fs"))

(defn is-dir? [the_dir]
  (try*
    (if-let [stat (.statSync fs the_dir )]
      (.isDirectory stat)
      false)
    (catch  e 
        (println "catching all exceptions, include js/exeptions")
      (print e)
      false
      )
    )
  )

(defn filter-condition-collection-into-collection [string-files fn_filters]

  (loop [the-first (first fn_filters) the-next (next fn_filters) the-files string-files ]
    (if (nil? the-next)
        (filter the-first the-files)
        (recur (first the-next) (next the-next) (filter the-first the-files))))
  )

(defn add-folder-char
  "this fn add a hash to the name of the file in case of this is a directory"
  [current_dir, files-collection]
  (map (fn[it] 
                      (if (is-dir? (str current_dir it))
                          (str it "/")
                        it
                          )
                      ) files-collection)
  )


(defn ^:export list_dir [dir]
  (let [
       files (.readdirSync fs dir)
        string-files (map (fn [item] item) files)
        conditions [
                 (fn  [s]   (not (== s "README.md")))
                 (fn  [s]   (not (util/is-system-file? s)))
                 ]
        res (filter-condition-collection-into-collection string-files conditions)
        ]
    (add-folder-char dir res)

   ))







(comment
  (require '[cljs.repl.node :as node])(node/run-node-nrepl)
  )
