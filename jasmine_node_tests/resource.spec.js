var util=require("./test_util.js");//console.log(require("./../compiled.js").ideate.ideate.list_dir());
var compiled=require("./../compiled.js");
console.log("Exploring the cljs map file ...");
console.log(compiled);
var ideate =compiled.ideate.ideate;
var compareResource =compiled.ideate.resource;
var resource =compiled.ideate.resource;
var xml=compiled.ideate.xml;
var ideate_util=compiled.ideate.util;
//        var r=compiled.foo.clj_to_js(ideate.list_dir("./"));


var files_dir="./tests/clone";
var target_dir=files_dir+"/test_dir";
var configurationFileUri, resourceTemplateUri,
    existingResourceInstanceUri, newResourceInstanceUri, result;
configurationFileUri="./sampleResources/copyConfig.xml";
resourceTemplateUri="./sampleResources/sampleResourceType-template";
existingResourceInstanceUri="./sampleResources/sampleResourceType-inst1";
newResourceInstanceUri=target_dir+"_bis";


describe("compareResourceCreatedFromExisting", function(){
    

    beforeEach(function(){
        util.try_to_remove_dir(files_dir);
        util.mkdirSync(files_dir);
        resource.clone(existingResourceInstanceUri, newResourceInstanceUri);

    });
    afterEach(function(){
        //      util.try_to_remove_dir(files_dir);
    });
    


    it("api.compareCopyFiles(copyFiles, sourceDir, targetDir)",
       function(){
           var
           xml=resource.loadConfig("./sampleResources/copyConfig.xml");
           

           var pathXML=newResourceInstanceUri+"/parts/1.xml";
           var xmlDoc=ideate.loadXML(pathXML);
           ideate.setValue(xmlDoc, "/part/name", "value changed");
           ideate.saveXML( pathXML, xmlDoc);


           // the newResourceInstanceURI already has not cleaned fields,
           // and is a copy cloned from existingResourceIntanceUri

           //  logging.inf(JSON.stringify(xml.copyFiles, null, 4));    
           var res=compareResource.compareCopyFiles(xml.copyFiles,
                                        existingResourceInstanceUri,
                                        newResourceInstanceUri);
           expect(res.length).toBe(2);
           // the file 1.xml has 2 changes respect the source, the
           //clean id and the changed value
           expect(res[0].list.length).toBe(2);
           expect(res[0].list[0]).toEqual( {
               "xpath": "0",
               "name": "part",
               "_name":"/part",
               "expectedValue": "",
               "attrs": [
                   {
                       "name": "id",
                       "expectedValue": "",
                       "actualValue": "1"
                   }
               ],
               "actualValue": ""
           });
           expect(res[0].list[1]).toEqual( {
               "xpath": "0_1",
               "name": "name",
               "_name":'/part/name',
               "expectedValue": "part 1",
               "attrs": [],
               "actualValue": "value changed"
           });
           expect(res[1].list.length).toBe(1);    
           expect(res[1].list).toEqual([
               {
                   "xpath": "0",
                   "name": "part",
                   "_name":'/part',
                   "expectedValue": "",
                   "attrs": [
                       {
                           "name": "id",
                           "expectedValue": "",
                           "actualValue": "2"
                       }
                   ],
                   "actualValue": ""
               }
           ]);

       });

    
    it("api.compareCopyItem(copyItem, sourceDir, targetDir)", function(){

        // still there is no change, so the comparation return null 
        expect(compareResource.compareCopyItem({uri:"comp1.xml",
                                    xpath:"/comp1/name"},
                                   newResourceInstanceUri, existingResourceInstanceUri)).toBe(null);

        // here we overwrite value
        var pathXML=newResourceInstanceUri+"/comp1.xml";
        var xmlDoc=ideate.loadXML(pathXML);
        ideate.setValue(xmlDoc, "/comp1/name", "value changed");
        ideate.saveXML( pathXML, xmlDoc);

        // expect the value changed  isnt null 
        var res=compareResource.compareCopyItem({uri:"comp1.xml",
                                     xpath:"/comp1/name"},
                                    existingResourceInstanceUri,
                                    newResourceInstanceUri);
        // logging.inf(JSON.stringify(res, null, 4));  
        expect(res).toEqual({expectedValue:"Test 1",  actualValue:"value changed"});
    }
      );

    


    it("api.compareCopySet(copySet, sourceDir, targetDir)", function(){
        
        var xml=
                resource.loadConfig("./sampleResources/copyConfig.xml");
        
        var res1=compareResource.compareCopySet(xml.copySets[0],
                                    existingResourceInstanceUri,
                                    newResourceInstanceUri);
        //        logging.inf(JSON.stringify(xml, null, 4));
        //        logging.inf(JSON.stringify(res1, null, 4));
        expect(res1.length).toBe(2);
        expect(res1).toEqual([ { xpath : '0', name : 'person',  _name:'/person',expectedValue : '', attrs : [ { name : 'id', expectedValue : '', actualValue : 'test1' } ], actualValue : '' }, { xpath : '0_1_3', name : 'last', _name:'/person/name/last', expectedValue : '', attrs : [  ], actualValue : 'Smith' } ]);

        //     // // here we overwrite one value

        var pathXML=newResourceInstanceUri+"/comp1.xml";
        var xmlDoc=ideate.loadXML(pathXML);
        
        ideate.setValue(xmlDoc, "/comp1/person/name/first", "Juan");
        ideate.saveXML( pathXML, xmlDoc);

        var res2=compareResource.compareCopySet(xml.copySets[0],
                                    existingResourceInstanceUri,
                                    newResourceInstanceUri);
        // plus one
        expect(res2.length).toBe(3);
        expect(res2).toEqual(  [ { xpath : '0', name : 'person', _name:'/person',expectedValue : '', attrs : [ { name : 'id', expectedValue : '', actualValue : 'test1' } ], actualValue : '' }, { xpath : '0_1_1', name : 'first',_name:'/person/name/first', expectedValue : 'Joe', attrs : [  ], actualValue : 'Juan' }, { xpath : '0_1_3', name : 'last', _name:'/person/name/last',expectedValue : '', attrs : [  ], actualValue : 'Smith' } ]  );

    }
      );

});

xdescribe("functions to analyse, parse and compare xml_tree elements ",
         function(){
             var info1="<xml><person id='test1' genre='jazz'><name j='3'><first>Joe</first><last>Smith</last></name><age>23</age><music>BILL EVANS</music></person></xml>";
             var info2="<xml><person id=''><name j='4'><first>Juan</first><last></last></name><age>21</age></person></xml>";
             var info3="<xml><person genre='blues'><name><first>Juan</first><last></last></name><age>23</age></person></xml>";


             var xml1, node1, node2, node3;

             beforeEach(function(){
                 xml1=xml.parse_xml(info1);        
                 node1=xml1.firstChild.firstChild;
                 node2=xml.parse_xml(info2).firstChild.firstChild;
                 node3=xml.parse_xml(info3).firstChild.firstChild;

             });
             afterEach(function(){});

             xit("api.compare_child_nodes(list, node )", function(){
                 var list=[];
                 compareResource.begin_walk(list, node1);
                 compareResource.compare_child_nodes(list, node2);
                 expect(list).toEqual([{xpath:"0", name: "person",_name:"/person",
                                        expectedValue:"",actualValue:"",
                                        attrs:[{name:"id", 
                                                expectedValue:"test1",
                                                actualValue:""},{name:"genre",
                                                                 expectedValue:"jazz",
                                                                 actualValue:"deleted"}]},
                                       { xpath:"0_0",name:"name",
                                         expectedValue:"",
                                         _name:"/person/name",
                                         attrs : [{name: "j", expectedValue:"3",actualValue:"4"}]
                                         ,actualValue:""},
                                       {xpath:"0_0_0", name:"first",
                                        _name:"/person/name/first",expectedValue:"Joe",
                                        attrs : [
                                        ],actualValue:"Juan"},
                                       {xpath:"0_0_1",name:"last",_name:"/person/name/last",
                                        expectedValue:"Smith", attrs :
                                        [  ],actualValue:""},
                                       { xpath:"0_1",name:"age",
                                         _name:"/person/age",expectedValue:"23",
                                         attrs : [
                                         ],actualValue:"21"},
                                       {xpath:"0_2",name:"music",_name:"/person/music",
                                        expectedValue:"BILL EVANS",
                                        attrs : [  ], actualValue:"deleted"
                                       }]);
             });
            xit("api.walk_child_nodes(list, node, path )", function(){
                 var list=[];
                 compareResource.begin_walk(list, node1);
                 expect(list).toEqual([{xpath:"0", name: "person", _name:"/person",
                                        expectedValue:"",
                                        attrs:[{name:"id",
                                                expectedValue:"test1"
                                               },{name:"genre",
                                                  expectedValue:"jazz"}]}, {name:"name", _name:"/person/name",expectedValue:"",
                                                                            xpath:"0_0",attrs
                                                                            :
                                                                            [{name:
                                                                              "j",
                                                                              expectedValue:"3"}]
                                                                           },{name:"first",
                                                                              expectedValue:"Joe", _name:"/person/name/first",
                                                                              xpath:"0_0_0",attrs : [  ] },{name:"last", expectedValue:"Smith",_name:"/person/name/last",
                                                                                                            xpath:"0_0_1",attrs
                                                                                                            :
                                                                                                            [
                                                                                                            ]
                                                                                                           },{name:"age",
                                                                                                              expectedValue:"23", _name:"/person/age",
                                                                                                              xpath:"0_1",attrs : [  ] },{name:"music",_name:"/person/music", expectedValue:"BILL EVANS",
                                                                                                                                          xpath:"0_2",attrs : [  ] }]);
             });
             xit("api.walk_attributes(node )", function(){
                 expect(compareResource.walk_attributes(node1)).toEqual([{name:"id", expectedValue: "test1"}, {name:"genre", expectedValue: "jazz"}]);
                 expect(compareResource.walk_attributes(node2)).toEqual([{name:"id", expectedValue: ""} ]);
                 expect(compareResource.walk_attributes(node2.firstChild)).toEqual([{name:"j", expectedValue: "4"} ]);
             });

             xit("api.compare_attributes(list, node)", function(){

                 expect(compareResource.compare_attributes(compareResource.walk_attributes(node1),
                                               node2)).toEqual([{name:"id",expectedValue:"test1",actualValue:""},
                                                                {name:"genre",expectedValue: "jazz", actualValue:"deleted"}]);

                 expect(compareResource.compare_attributes(compareResource.walk_attributes(node1),
                                               node3)).toEqual([{name:"id",expectedValue:"test1",actualValue:"deleted"},
                                                                {name:"genre",expectedValue: "jazz", actualValue:"blues"}]);
             });



             xit("api.getXPathByStringPath(treeNode, path)",
                function(){
                    //       var info1="<xml><person id='test1' genre='jazz'><name j='3'><first>Joe</first><last>Smith</last></name><age>23</age><music>BILL EVANS</music></person></xml>";
                    var res=compareResource.getXPathByStringPath(node1, "0_0_0");
                    expect(res).toEqual("/name/first");



                });

             xit("api.searchNodeInXMLByPath(treeNode, path)", function(){
                 var res=compareResource.searchNodeInXMLByPath(node1, "0_0_0");
                 expect(ideateLib.serializeDOM(res)).toEqual("<first>Joe</first>");

                 var res2=compareResource.searchNodeInXMLByPath(node1, "0_1");
                 expect(ideateLib.serializeDOM(res2)).toEqual("<age>23</age>");

             });

             xit("basic asserts analizing xml structure", function(){
                 expect(node1.nodeType).toBe(1); // nodetype: element node
                 expect(node1.attributes.length).toBe(2);

                 expect(node2.nodeType).toBe(1); // nodetype: element node
                 expect(node2.attributes.length).toBe(1);
                 
                 expect(node3.nodeType).toBe(1); // nodetype: element node
                 expect(node3.attributes.length).toBe(1);


                 expect(node1.childNodes.length).toBe(3);
                 expect(node2.childNodes.length).toBe(2);

             });
         });
