(ns ideate.fs
  (:require
      [ideate.util :as util]))

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

