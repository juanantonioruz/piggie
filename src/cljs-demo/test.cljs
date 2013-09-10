(ns cljs-demo.test
  (:require-macros [cemerick.cljs.test :refer (is deftest with-test run-tests testing)])
  (:require [ideate.ideate :as -ideate][cemerick.cljs.test :as t]))

(deftest somewhat-less-wat
  (is (= 1 1)))

( deftest reading-dirs
  
  (let [the-files (-ideate/list_dir "./")]
    (print (count the-files))
    (is (= (count the-files) 17))))


(defn retest []  (t/test-ns 'cljs-demo.test))



