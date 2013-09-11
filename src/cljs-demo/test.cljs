(ns cljs-demo.test
  (:require-macros [cemerick.cljs.test :refer (is deftest with-test run-tests testing)])
  ;(:require [cemerick.cljs.test :as t])
  )

(deftest somewhat-less-wat
  (is (= 1 1)))




