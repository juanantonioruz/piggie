(ns foo
  (:require [cljs.nodejs :as nodejs]
            [ey.bar :as bar]
            [ideate.ideate :as ideate]
            ))

(defn ^:export greet [name, title]

  (. js/console log (ideate/list_dir "./"))
  (str "Hola, " (bar/title title) " " name  ))

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

(defn ^:export bridge [dirname]
  (clj->js (ideate/list_dir "./"))
  )

(defn ^:export clj_to_js [the_clj]
  (clj->js the_clj)
  )

(comment "trying to understand require and use... so these are a few exaples"  example-of-use
         (ns prueba 
           (:use [clojure.string :only[capitalize
                                       ]])))
(comment example-of-require
         (ns juan 
           (:require [clojure.string :as stt
                      ])))


(comment  let [http (js/require "http")
               handler (fn [req res] (.end res "Hello sailor!"))
               server (.createServer http handler)]
          (comment .close server (fn []))
          (comment .stop server (fn []))
          (comment .listen server 1337))
