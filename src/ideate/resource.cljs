(ns ideate.resource
  (:require [ideate.fs :as fs][ideate.ideate :as ideate])
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
                   ;(print "dir" the-new-url)
                   (-clone the-new-url the-target-new-url)
                   )
                 (do
                   ;(println (str "FILEEE" the-new-url " >> " the-target-new-url))
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
