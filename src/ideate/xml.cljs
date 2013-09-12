(ns ideate.xml
  (:require
      [ideate.util :as util]))


(def xmldom (js/require "xmldom"))
(def xpath (js/require "xpath"))

(def dom-parser (.-DOMParser xmldom))
(def xml-serializer (.-XMLSerializer xmldom))

(defn ^:export parse-xml [xml-string]
  (let [ dom-parser-instance (dom-parser.)]
    (.parseFromString dom-parser-instance (str xml-string) "text/xml"))
  )

(defn ^:export serialize-dom [the-dom]
  (let [ xml-serializer-instance (xml-serializer.)]
    (.serializeToString xml-serializer-instance the-dom))
  )
(defn select-first-xpath-result [xml-doc xpath-pattern]
  (.select1 xpath xpath-pattern xml-doc)
  
  )
(defn ^:export extract [xml-doc xpath-pattern]
  (.select xpath xpath-pattern xml-doc)
  
  )
(defn ^:export extract1 [xml-doc xpath-pattern]
  (select-first-xpath-result xml-doc xpath-pattern)

  
  )
