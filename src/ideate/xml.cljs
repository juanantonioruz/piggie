(ns ideate.xml
  (:require
      [ideate.util :as util]))


(def xmldom (js/require "xmldom"))
(def xpath (js/require "xpath"))

(def dom-parser (.-DOMParser xmldom))
(def xml-serializer (.-XMLSerializer xmldom))

(defn parse-xml [xml-string]
  (let [ dom-parser-instance (dom-parser.)]
    (.parseFromString dom-parser-instance xml-string "text/xml"))
  )
