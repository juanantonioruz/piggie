(ns ideate.fs
  (:require
   [ideate.util :as util]
   [clojure.string :as -str] ))

(def fs (js/require "fs"))

(defn is-dir? [the_dir]
  (try*
    (if-let [stat (.statSync fs the_dir )]
      (.isDirectory stat)
      false)
    (catch  e 
      ;  (println "catching all exceptions, include js/exeptions")
      ;(print e)
      false
      )
    )
  )

(defn check-correct-dir-format [dir]
  (if (= "/" (last dir)) dir (str dir "/"))
  )

(defn extract-dir-from-uri-file [uri]
  (let [split-uri (-str/split uri "/")]
    (-str/join "/" (-> split-uri reverse next reverse)))
  )
