(ns ideate.ideate
  (:require 
            [ideate.util :as util])
  )

(comment "trying to understand require and use... so these are a few exaples"  example-of-use
         (ns prueba 
           (:use [clojure.string :only[capitalize
                                       ]])))
(comment example-of-require
         (ns juan 
           (:require [clojure.string :as stt
                      ])))
(def hola "hola")

(defn filter-condition-collection-into-collection [string-files fn_filters]

  (loop [the-first (first fn_filters) the-next (next fn_filters) the-files string-files ]
    ;(println the-files)
    ;(println (filter the-first the-files))
    (if (nil? the-next)
        (filter the-first the-files)
        (recur (first the-next) (next the-next) (filter the-first the-files))))
  
  )


(defn ^:export list_dir [dir]
  (let [fs (js/require "fs")
       files (.readdirSync fs dir)
        string-files (map (fn [item] item) files)
        conditions [
                 (fn  [s]   (not (== s "README.md")))
                 (fn  [s]   (not (util/is-system-file? s)))
                  ]
        ]
    (filter-condition-collection-into-collection string-files conditions)
   ))




(comment  let [http (js/require "http")
               handler (fn [req res] (.end res "Hello sailor!"))
               server (.createServer http handler)]
          (comment .close server (fn []))
          (comment .stop server (fn []))
          (comment .listen server 1337))

(comment
  (require '[cljs.repl.node :as node])(node/run-node-nrepl)
  )
