(ns ideate.resource
  (:require
   [ideate.ideate :as ideate]
    [ideate.xml :as xml]
 [clojure.zip :as zip]
 [clojure.walk :as ww]
   ))

(defn -extract-uri-xpath
  ([node prefix]
     (let [
           give-me (fn [v]  (.getAttribute node v))
           uri (give-me "uri")
           xpath (let [the-xpath (give-me "xpath")]
                   (if prefix
                     (str prefix "/" the-xpath)
                     the-xpath
                     )
                   )
           ]
       {:uri uri  :xpath xpath})
     )
  ([node]
     (-extract-uri-xpath node nil)
     )
  
  )

(defn -extract-copy-item [copy-item]
  (-extract-uri-xpath copy-item)
  )

(defn -extract-copy-set [copy-set]
  (let [
        extract-cs (-extract-uri-xpath copy-set)
        childs (.-childNodes copy-set)
        the-length (.-length childs)
        clear-items  (reduce (fn [col item]
              (if (= (aget childs item  "nodeName") "clearItem")
                (conj col (-extract-uri-xpath (aget childs item)  (:xpath extract-cs)))
                col
                ) 
              ) [] (range the-length))
        ]
    (assoc  extract-cs :clearItems clear-items ) 
    )
  )




(defn ^:export compareCopyItem [copyItem source-dir target-dir]
  (comment let [
                copyItemXMLSource (ideate/loadXML source-dir (str source-dir "/" (.-url copyItem)))
                ])

  )

(defn ^:export walk_attributes [node]
  "")

(defn ^:export compare_attributes [the-list node]
  "")

(defn ^:export walk_node [the-list node]
  "")

(defn ^:export begin_walk [the-list node]
                                        ;  (walk_node the-list)
  "")

(defn ^:export -clone [the-uri  uri-target]
  "resursive copy contents"
  (if (fs/is-dir? the-uri)
    
    (let [files (ideate/list-dir the-uri)]
      (map (fn [item]
             (let [the-new-url (str the-uri item)
                   the-target-new-url (str uri-target item)
                   ]
               (if (fs/is-dir? the-new-url)
                 (do
                   (ideate/createFolder the-target-new-url)
                   (-clone the-new-url the-target-new-url)
                   )
                 (do
                   (ideate/copy the-new-url the-target-new-url)
                   )
                 )
               )
             ) files)
      )
    
    ;(println "no dir" the-uri)
    )
  )

(defn ^:export clone [the-uri  uri-target]
  "resursive copy contents"
  (ideate/remove (fs/check-correct-dir-format uri-target))
  (ideate/createFolder uri-target)
  (-clone (fs/check-correct-dir-format the-uri) (fs/check-correct-dir-format uri-target))
  (str "clone operation ok!" the-uri " > "  uri-target)
  )

(defn ^:export loadConfig [uri]
  (print "loading uri")
  (let [xml-doc (ideate/loadXML uri)
        ]
    {
     :copyItems (map -extract-copy-item (xml/extract xml-doc "//copyItem"))
     :copySets (map -extract-copy-set (xml/extract xml-doc "//copySet"))
     :copyFiles (map -extract-copy-set (xml/extract xml-doc "//copyFiles"))
     }
    )
  

  )

(loadConfig "./sampleResources/copyConfig.xml")
(comment
  



  (-extract-copy-set (first the-sets))
  (def the-config (ideate/loadXML "./sampleResources/copyConfig.xml"))
(def the-sets (xml/extract the-config "//copySet"))

)


