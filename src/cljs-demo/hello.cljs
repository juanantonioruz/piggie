(ns cljs-demo.hello)
(def my-server (atom {}))

(defn start [& _]
  (let [fs (js/require "fs")
        ]
    (.readdir fs "." (fn [err files] (println files)))
 )
  (println "Hello World!")
  ( let [http (js/require "http")
      handler (fn [req res] (.end res "Hello sailor!"))
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
    (println (aget my-api "hello"))
    )
  )

(set! *main-cli-fn* echo_prop)


