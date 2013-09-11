(ns ideate.my-macro)

(defmacro unless
  [pred & body]
  `(if (not ~pred)
     (do ~@body)
     nil))



(defmacro my-condition
  [inclusive & body]
  `(if (not ~inclusive)
     (do ~@body)
     nil))
