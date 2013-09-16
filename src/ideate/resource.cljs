(ns ideate.resource
  (:require
   [ideate.ideate :as ideate]
   [ideate.xml :as xml]
   [clojure.zip :as zip]
   [clojure.walk :as ww]
   [ideate.fs :as fs]
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


(defn ^:export -clone [the-uri  uri-target]
  "resursive copy contents"
  (if (fs/is-dir? the-uri)
    
    (let [files (ideate/list-dir the-uri)]
      (doall (map (fn [item]
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
              ) files))
    
      )

                                        ;(println "no dir" the-uri)
    (.log js/console "it's not a directory")
    )
      
  )

(defn ^:export clone [the-uri  uri-target]
  "resursive copy contents"
  (ideate/createFolder uri-target)
  (-clone (fs/check-correct-dir-format the-uri) (fs/check-correct-dir-format uri-target))
  (.log js/console (str "clone operation ok!" the-uri " > "  uri-target))
  )


(defn ^:export clearItem [clearItem xmlDoc]
  (ideate/setValue xmlDoc (clearItem :xpath) "")
  )

(defn ^:export copyItem [copy-item source-dir target-xml-doc]
  (let [xml-source (ideate/loadXML (str source-dir "/" (:uri copy-item)))
        actual-value (ideate/getValue xml-source (:xpath copy-item))
        ])
  (ideate/setValue target-xml-doc (:xpath copy-item) actual-value)
  )

(defn ^:export copyFiles [copyFiles source-dir target-dir]
  (for [file (ideate/list-dir source-dir (:uri copyFiles))]
    (when-not (= "/" (last file))
      (let [base-uri (str (:uri copyFiles) "/" file)
            xml-doc (ideate/loadXML (str source-dir base-uri))]
        (map #(clearItem % xml-doc) (copyFiles :clearItems))
        (ideate/saveXML (str target-dir base-uri) xml-doc)
        
        )
      )
    )  
  )
(defn ^:export copySet [copySet source-dir copy-set-xml-target]
  (let [
        xml-source (ideate/loadXML (str source-dir "/" (:uri copySet)))
        node-data-value (xml/extract1 xml-source (:xpath copySet))
        node-target (xml/extract1 copy-set-xml-target (:xpath copySet))
        ]
    (.replaceChild (.-parentNode node-target ) node-data-value node-target)
    (map #(clearItem % copy-set-xml-target) (copySet :clearItems))
    )
  
  )

(defn ^:export createNewResourceInstanceFromExisting [newResourceInstanceUri  resourceTemplateUri  existingResourceInstanceUri  configurationFileUri]

  
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


(comment
  (loadConfig "./sampleResources/copyConfig.xml") 
  )


      
