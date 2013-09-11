(ns ideate.util
  (:require [clojure.string :as -str] )
  )

(defn contains? [s match]
  (let [subtituttion (-str/replace s match "")]
    (not (== s substitution))
    )
  
  )

(defn starts-with? [s match]
  (let [first-char (first s)]
    (== first-char match)
    )
  )

(defn is-system-file? [s]
  ;(println (str "comparing " s "result " (starts-with? s ".")))
  (starts-with? s ".")
  )

(contains? ".ey" ".")

(starts-with? ".ey" "+")

(is-system-file? ".ey")
;(println "ey")
(-str/replace ".ey" "." "")
