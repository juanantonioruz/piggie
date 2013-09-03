(ns cljs-demo.hello)

(defn start [& _]
  (let [fs (js/require "fs")
        ]
    (.readdir fs "." (fn [err files] (println files)))
 )
  (println "Hello World!")
  ( let [http (js/require "http")
      handler (fn [req res] (.end res "Hello sailor!"))
      server (.createServer http handler)]
  (.listen server 1337))
  (println "Hello World!"))


(set! *main-cli-fn* start)

