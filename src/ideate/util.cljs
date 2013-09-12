(ns ideate.util
  (:require [clojure.string :as -str] )
  )


(defn throw-js-error [& message]
  (comment throw (js/Error. "error"))
       (throw (js/Error. (apply str (str "\nAN ERROR OCCURRED!\n" (-str/join  "\n" message))))))

(defn ^:export clj_to_js [x]
  (clj->js x)
  )
(defn clj->js
  "Recursively transforms ClojureScript maps into Javascript objects,
   other ClojureScript colls into JavaScript arrays, and ClojureScript
   keywords into JavaScript strings."
  [x]
  (cond
    (string? x) x
    (keyword? x) (name x)
    (map? x) (.strobj (reduce (fn [m [k v]]
               (assoc m (clj->js k) (clj->js v))) {} x))
    (coll? x) (apply array (map clj->js x))
    :else x))

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



(defn apply-filters-to-collection [ fn_filters string-files]
  (loop [the-first (first fn_filters) the-next (next fn_filters) the-files string-files ]
    (if (nil? the-next)
      (filter the-first the-files)
      (recur (first the-next) (next the-next) (filter the-first the-files))))
  )



;(contains? ".ey" ".")

;(starts-with? ".ey" "+")

;(is-system-file? ".ey")
;(println "ey")
;(-str/replace ".ey" "." "")

