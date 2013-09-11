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



(defn apply-filter-conditions-to-collection [ fn_filters string-files]
  (loop [the-first (first fn_filters) the-next (next fn_filters) the-files string-files ]
    (if (nil? the-next)
      (filter the-first the-files)
      (recur (first the-next) (next the-next) (filter the-first the-files))))
  )

(contains? ".ey" ".")

(starts-with? ".ey" "+")

(is-system-file? ".ey")
;(println "ey")
(-str/replace ".ey" "." "")
