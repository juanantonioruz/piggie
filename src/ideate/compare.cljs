(ns ideate.compare
  (:require
   [ideate.ideate :as ideate]
    [ideate.xml :as xml]
    [ideate.resource :as resource]
   ))




(defn compareCopyItem [copy-item source-dir target-dir]
  (let [
        source-file (ideate/loadXML (str source-dir "/" (:uri copy-item)))
        source-value (ideate/getValue source-file (:xpath copy-item))
        target-file (ideate/loadXML (str target-dir "/" (:uri copy-item)))
        target-value (ideate/getValue target-file (:xpath copy-item))
        ]
    (if (== source-value target-value)
      nil
      {:actualValue target-value :expectedValue source-value}
      )
    
    )
  
  )


(compareCopyItem
 (let [
        xml-config  (ideate/loadXML "./sampleResources/copyConfig.xml")
        copy-item-xml (xml/extract1 xml-config "//copyItem")
        copy-item (resource/-extract-copy-item copy-item-xml)
        ]
    copy-item
    )
 "./sampleResources/sampleResourceType-inst1" "./sampleResources/sampleResourceType-inst2")
