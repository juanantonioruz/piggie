(ns ey.bar
  (:require [cljs.nodejs :as nodejs]))

(defn ^:export title [t]
  (str t " Amazing" ))
