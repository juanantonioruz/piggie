(ns ideate.mymacro)

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

(defmacro recursive-apply [the-fn-type fns string-files]
    `(loop [the-first# (first ~fns) the-next# (next ~fns) the-files# ~string-files ]
    (if (nil? the-next#)
      (~the-fn-type the-first# the-files#)
      (recur (first the-next#) (next the-next#) (~the-fn-type the-first# the-files#))))
  )
