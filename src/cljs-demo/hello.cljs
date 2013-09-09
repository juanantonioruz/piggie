(ns cljs-demo.hello

; this macro not work with nsclj build  (:require-macros [cemerick.cljs.test :as uu])
;  (:require [cemerick.cljs.test :as t])
  )


(comment deftest somewhat-less-wat
  (is (= "{}[]" (+ {} []))))

(comment deftest javascript-allows-div0
  (is (= js/Infinity (/ 1 0) (/ (int 1) (int 0)))))

(def my-server (atom {}))

(defn start [& _]
  (let [fs (js/require "fs")
        ]
    (.readdir fs "." (fn [err files] (println files)))
    )


  (println "Hello World BIS!")
  ( let [http (js/require "http")
         handler (fn [req res] (.end res "Hello Juan!"))
         server (.createServer http handler)]
    (.listen server 1337)
    (reset! my-server server)
    )
  (println "Hello World!"))

(defn stop []
  ( let [http (js/require "http")
         ]
    (.stop @my-server (fn [] (println "stopping the node server")))

    )
  )
(defn echo_prop []
  (let [my-api (js/require "./my_api")]
    (println (aget my-api "db"))
    )
  )



(defn ^:export  examplecallback []
  (let [my-api (js/require "./my_api") ; the api.js lib used for this example
        db (aget my-api "db") ; this is your db object
        my_fn (fn [_item] ;this is your callback function
                (println "printing from clojurescript"  _item)
                )
        ]
    (do
      (-> db (.values "inventory") (.done my_fn)) ;; calling your js in a similar way you want in js
      ;; or 
      (.done (.values db "inventory_bis") my_fn) ;; calling nested form in the standar lisp manner
      )
    ) 
  )


(ns example)
(defn ^:export hello [name]
  
  (comment "thats work but idont know how run jasminenode then" let [j (js/require "jasmine-node")]
    (println js/expect)

    ( js/describe "my description" (fn []
                                     (.toBe (js/expect true) false)
                                     (js/it "it description" (fn []
                                                               (println "inside it")
                                                               )))
                  (println "inside jasmine"))
    ) 

  (println "do dooo ityyyyyeeey!" ))


;(set! *main-cli-fn*  hello)











