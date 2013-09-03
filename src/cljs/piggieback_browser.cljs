(ns piggieback-browser
  (:require [clojure.browser.repl :as repl]))
(repl/connect "http://localhost:9000/repl")
(defn alerta []
  (js/alert "here again bis"))
