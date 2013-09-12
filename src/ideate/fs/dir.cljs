(ns ideate.fs.dir
   (:require 
   [ideate.util :as util]
   [ideate.fs :as fs]))
(def default-conditions {
                         :hide-readme (fn  [file-name]   (not (== file-name "README.md")))
                         :hide-system-files (fn  [file-name]   (not (util/is-system-file? file-name)))
                         })

(def default-transformations {
                              :add-slash-if-folder (fn [dir]
                                                (fn [it] (if (fs/is-dir? (str dir it)) (str it "/") it ))
                                                )
                              
                              })
