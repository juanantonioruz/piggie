(ns cljs-demo.test
  (:require-macros [cemerick.cljs.test :refer (is deftest with-test run-tests testing)])
  (:require [ideate.ideate :as -ideate][cemerick.cljs.test :as t]))

(deftest somewhat-less-wat
  (is (= 1 1)))

(deftest reading-dirs
  (is (> (count (-ideate/list_dir "./")) 0)))






