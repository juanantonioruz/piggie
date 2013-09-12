var util=require("./test_util.js");//console.log(require("./../compiled.js").ideate.ideate.list_dir());
var compiled=require("./../compiled.js");
console.log("Exploring the cljs map file ...");
console.log(compiled);
var ideate =compiled.ideate.ideate;
var xml=compiled.ideate.xml;
var ideate_util=compiled.ideate.util;
describe("A suite to test a cljs compilation to use as a node dep", function() {
    it("listing dir resources", function() {
        var r=compiled.foo.clj_to_js(ideate.list_dir("./"));
        console.log(r);
        expect(r).toContain("doc/");

    });
});



describe ("ideateAPI FS and XML --   test suite", function(){
    var my_app;
    beforeEach(function(){
        my_app=ideate;
    });
    
    describe("having a file ... ",
             function(){
                 
                 var files_dir="./tests/files_fs";
                 var test_file=files_dir+"/my_test_file.txt";
                 var test_file_data="the data file";
                 beforeEach(function(){
                     util.try_to_remove_dir(files_dir);
                     util.mkdirSync(files_dir);
                     util.mkdirSync(files_dir+"/example_dir");
                     util.writeFileSync(test_file, test_file_data);}
                           );
                 afterEach(function(){
                     util.try_to_remove_dir(files_dir);
                 });
                 
                 it("** copy(origin, destination) behavior:  synchronous copy file destination doesn't exist ", function(){
                     var name_target_file=files_dir+"/target.txt";
                     
                     my_app.copy(test_file, name_target_file);
                     
                     var data=util.readFileSync(name_target_file);
                     
                     expect(data).not.toBeNull();
                 }
                   );
                 it("** copy(origin, destination) behavior:"
                    +"synchronous copy file: already exist it "
                    + "will be overwritten ", function(){
                        var name_target_file=files_dir+"/target.txt";
                        my_app.createFile(name_target_file);
                        var copy=function(){
                            my_app.copy(test_file,
                                        name_target_file);
                        };
                        expect(copy).not.toThrow();
                    }
                   );

                 
             });
    describe("inside a directory ",
             function(){
                 var files_dir="./tests/files_fs2";
                 beforeEach(function(){
                     util.try_to_remove_dir(files_dir);
                     util.mkdirSync(files_dir);
                 }
                           );
                 afterEach(function(){
                     util.try_to_remove_dir(files_dir);
                 });
                 
                 it("** createFile(name_target_file): behavior Exception: "
                    + "create 'empty' file in"
                    + " directory that doesn't exist, so it"
                    + " will throw an Exception",
                    function(){
                        var dir_not_exist="/sample";
                        var name_target_file=files_dir+dir_not_exist+"/target.txt";
                        expect(function(){my_app.createFile(name_target_file);}).toThrow();
                    }
                   );

                 it("** createFile(name_target_file): behavior:"
                    +"create 'empty' file that"
                    + " already exists it will be overwritten", function(){
                        var name_target_file=files_dir+"/target.txt";
                        my_app.createFile(name_target_file);
                        expect(function(){my_app.createFile(name_target_file);}).not.toThrow();
                        var data=util.readFileSync(name_target_file);
                        expect(data).not.toBeNull();
                    }
                   );
                 
                 it("** createFolder(name_target_dir): behavior: create 'empty' dir", function(){
                     var name_target_dir=files_dir+"/target_dir";
                     my_app.createFolder(name_target_dir);
                     var data=util.readdirSync(name_target_dir);
                     expect(data).not.toBeNull();
                 }
                   );
                 it("** createFolder(name_target_dir): behavior Exception: "
                    + " create 'empty' dir in"
                    + " directory that doesn't exist, so it"
                    + " will throw an Exception",
                    function(){
                        var dir_not_exist="/sample_dir";
                        var name_target_dir=files_dir+dir_not_exist+"/target_dir";
                        expect(function(){my_app.createFolder(name_target_dir);}).toThrow();
                    }
                   );
             });    
    
    describe("having a dir with files ",
             function(){
                 var files_dir="./tests/files";
                 var test_dir_name_1="dir_1";
                 var test_dir_name_2="dir_2";
                 var test_file_name_1="1.txt";
                 var test_file_name_2="2.txt";
                 var test_file_name_3="3.txt";
                 var test_file_name_a="a.txt";

                 
                 var test_file_1=files_dir+"/"+test_file_name_1;
                 var test_file_2=files_dir+"/"+test_file_name_2;
                 var test_file_3=files_dir+"/"+test_file_name_3;

                 var test_dir_1=files_dir+"/"+test_dir_name_1;
                 var test_dir_2=files_dir+"/"+test_dir_name_2;
                 var test_file_a=test_dir_1+"/"+test_file_name_a;
                 
                 beforeEach(function(){
                     util.try_to_remove_dir(files_dir);
                     util.mkdirSync(files_dir);
                     util.mkdirSync(test_dir_1);
                     
                     util.writeFileSync(test_file_1, "");
                     util.writeFileSync(test_file_2, "");
                     util.writeFileSync(test_file_3, "");                                      
                     util.writeFileSync(test_file_a, "");
                 }
                           );
                 afterEach(function(){
                     util.try_to_remove_dir(files_dir);
                 });

                 it("list(uri) return ['file1', 'file2', 'folder/']", function(){
                     var files=ideate_util.clj_to_js(my_app.list_dir(files_dir));

                     expect(files.length).toBe(4);

                     expect(files).toContain(test_file_name_1);
                     expect(files).toContain(test_file_name_2);
                     expect(files).toContain(test_file_name_3);
                     // name of dirs must be followed by forward slash
                     expect(files).toContain(test_dir_name_1+"/");

                 }
                   );
                 it("** list(uri) exception check: listing dir doesn't exist throw Exception", function(){
                     var list_dir=function(){
                         my_app.list(files_dir+"_not_exist_");
                     };
                     expect(list_dir).toThrow();
                 }
                   );

                 it("move(origin, target): Synchronous move file", function(){
                     var path_target_file=test_dir_1+"/"+test_file_name_1;
                     my_app.move(test_file_1, path_target_file);
                     var  destiny=util.readFileSync(path_target_file);
                     expect(destiny).not.toBeNull();
                     var origin=function(){util.readFileSync(test_file_1);};
                     expect(origin).toThrow();
                 }
                   );
                 it("** move(origin, target) check exception: if file doesn't exist"
                    + " throw exception", function(){
                        var path_target_file_not_exist=test_dir_1+"/"+test_file_name_1+"__";
                        var moving=function(){
                            my_app.move(test_file_1, path_target_file);
                        };
                        expect(moving).toThrow();
                    }
                   );
                 it("** move(origin, target) check exception: if target folder doesn't exist"
                    + " throw exception", function(){
                        var path_target_file_dir_not_exist=test_dir_1+"/doesnt_exist/"+test_file_name_1;
                        var moving=function(){
                            my_app.move(test_file_1, path_target_file_dir_not_exist);
                        };
                        expect(moving).toThrow();
                    }
                   );
                 
                 it("** move(origin, target) testing case: moving folder", function(){
                     var path_target_dir=files_dir+"/target_dir";
                     my_app.move(test_dir_1, path_target_dir);
                     var  destiny=util.readdirSync(path_target_dir);
                     var origin=function(){util.readdirSync(test_dir_1);};
                     expect(destiny).not.toBeNull();
                     expect(origin).toThrow();
                 }
                   );
                 it("**move(origin, target) exception testing case: moving"
                    + " folder that doesn't exist"
                    + " throw Exception", function(){
                        var path_target_dir=files_dir+"/target_dir";
                        function moving(){
                            my_app.move("not_exist/"+test_dir_1, path_target_dir);
                        };
                        expect(moving).toThrow();
                    }
                   );

                 it("**move(origin, target) exception testing case: moving folder to folder that"
                    + " doesn't exist throw Exception", function(){
                        var path_target_dir=files_dir+"/doesnt_exist/target_dir";
                        function moving(){
                            my_app.move(test_dir_1,path_target_dir);
                        }
                        expect(moving).toThrow();
                    }
                   );
                 it("remove(uri): Synchronous remove empty folder ", function(){
                     util.mkdirSync(test_dir_2);
                     my_app.remove(test_dir_2);
                     var origin=function(){util.readdirSync(test_dir_2);};
                     expect(origin).toThrow();
                 }
                   ); 

                 it("** remove(uri): Synchronous trying to remove a"
                    + " nonexistent folder throw exception"
                    + "  ", function(){
                        function tryit(){   
                            my_app.remove(test_dir_2);
                        }
                        expect(tryit).toThrow();
                    }
                   ); 
                 it("** remove(uri) testing case: Synchronous remove/unlink not empty folder ", function(){
                     my_app.remove(test_dir_1);
                     var origin=function(){util.readdirSync(test_dir_1);};
                     expect(origin).toThrow();
                 }
                   );
                 
             });

    describe("xml and fs",
             function(){
                 var files_dir="./tests/files_xml";
                 var test_file_name_1="example.xml";
                 var test_file_1=files_dir+"/"+test_file_name_1;
                 
                 beforeEach(function(){
                     my_app.createFolder(files_dir);
                 }
                           );
                 afterEach(function(){
                     my_app.remove(files_dir);

                 });

                 it("loadXML(uri) && saveXML(uri, xmlDoc): return"
                    + " xmlDoc && create file in uri with xmlDoc"
                    + " data ", function(){

                        var doc=util.createXMLDocFromString(
                            '<xml><book><title>HPotter</title></book></xml>');

                        var my_xml_dom=ideate_util.clj_to_js(xml.parse_xml(doc));

                        my_app.saveXML(test_file_1, doc);
                        
                        var data=my_app.loadXML(test_file_1);
                        
                        expect(my_app.loadXML(test_file_1)).not.toBe(null);
                        console.log("ssssss"+my_xml_dom);
                        console.log(my_app.getValue(xml.parse_xml(doc), "//title/text()"));
                        expect(my_app.getValue(xml.parse_xml(doc), "//title/text()"))
                            .toEqual(my_app.getValue(data, "//title/text()"));
                        expect(xml.serialize_dom(data)).toEqual(xml.serialize_dom(my_xml_dom));
                        
                        
                    }
                   );
                 it("** saveXML(uri, xmlDoc): check exception: save existent xml doesn't throw error"
                    , function(){
                        my_app.createFile(test_file_1);

                        var doc=util.createXMLDocFromString(
                            '<xml><book><title>HPotter</title></book></xml>');

                        var my_xml_dom=xml.parse_xml(doc);
                        function try_to_save(){
                            my_app.saveXML(test_file_1, doc);
                        }
                        expect(try_to_save).not.toThrow();
                    }
                   );

                 it("** loadXML(uri) check accessing elements from node ", function(){

                     var doc=util.createXMLDocFromString(
                         '<xml><book ref="b_1" id="1"><title>HPotter</title></book></xml>');

                     var my_xml_dom=xml.parse_xml(doc);
                     my_app.saveXML(test_file_1, doc);
                     
                     var data=my_app.loadXML(test_file_1);
                     
                     expect(data).not.toBe(null);
                     expect(data.nodeName).toBe("#document");
                     expect(data.nodeType).toBe(9);
                     
                     expect(data.childNodes.length).toBe(1);
                     var node_xml=data.childNodes[0];
                     expect(node_xml.nodeName).toBe("xml");
                     var node_book=node_xml.childNodes[0];
                     expect(node_book.nodeName).toBe("book");
                     // element.nodeType==1
                     expect(node_book.nodeType).toBe(1);
                     // 
                     expect(node_book.nodeValue).toBe(null);
                     expect(node_book.childNodes.length).not.toBe(0);

                     expect(node_book.attributes.length).toBe(2);
                     var attr_id=node_book.attributes[1];
                     expect(attr_id.value).toBe("1");
                     // attr.nodeType==2
                     expect(attr_id.nodeType).toBe(2);
                     

                     var node_title=node_book.childNodes[0];
                     var node_title_value=node_title.childNodes[0];
                     expect(node_title_value.nodeValue).toBe("HPotter");
                     // value of element.Type==3
                     expect(node_title_value.nodeType).toBe(3);
                     expect(node_title_value.childNodes).toBe(null);

                     var get_value=my_app.getValue(node_xml, "//book/title/text()");
                     expect(get_value).toBe("HPotter");

                     var get_id_attribute=my_app.getValue(node_book, "//@id");
                     expect(get_id_attribute).toBe("1");

                     var set_id=my_app.setValue(node_book,
                                                "//@id",
                                                4);
                     expect(node_book.nodeName).toBe("book");
                     //assert id is updated
                     expect(my_app.getValue(node_book, "//@id")).toBe("4");
                     
                     





                 }
                   );
                 
             });
    
    describe ("xml related functions", function(){
        var my_app;
        var my_xml_string, my_xml;
        var book_title, title_xml;
        
        beforeEach(function(){
            
            my_app=ideate;
            book_title="Harry Potter";
            title_xml='<title id="1">'+book_title
                + '</title>';

            my_xml_string = '<book >'+title_xml+'</book>';
            my_xml=xml.parse_xml(my_xml_string);
        });
        


        it("setValue(xmlDoc, xpath, value): set value in xpath query on xmlDoc   ", function(){
            var new_title="changed tittle";
            var my_xml_expected = '<book><title id="1">'+new_title+'</title></book>';
            var doc=xml.parse_xml(my_xml);
            my_app.setValue(doc, "/book/title",new_title);
            expect(xml.serialize_dom(doc)).toEqual(my_xml_expected);
        });
        
        it("** setValue(xmlDoc, xpath, value):: copyItem :: behavior with"
           + "  attribute data    ", function(){
               var new_value_atr="my_booooooook";
               var my_xml_expected = "<book><title id=\""+new_value_atr+"\">"+book_title+"</title></book>";
               var doc=xml.parse_xml(my_xml);
               expect(my_app.getValue(doc, "//@id",new_value_atr)).toBe("1");
               my_app.setValue(doc, "//@id", new_value_atr);
               expect(my_app.getValue(doc, "//@id",new_value_atr)).toBe(new_value_atr);
               expect(xml.serialize_dom(doc)).toEqual(my_xml_expected);
           });
        
        it("** setValue(xmlDoc, xpath, value):: clearItem::  behavior setting empty"
           + " value ", function(){
               var new_value_atr="";
               var my_xml_expected = "<book><title id=\""+new_value_atr+"\">"+book_title+"</title></book>";
               var doc=xml.parse_xml(my_xml);
               expect(my_app.getValue(doc, "//@id",new_value_atr)).toBe("1");
               my_app.setValue(doc, "//@id", new_value_atr);
               expect(my_app.getValue(doc, "//@id",new_value_atr)).toBe(new_value_atr);
               expect(xml.serialize_dom(doc)).toEqual(my_xml_expected);
           });
        // TODO setValue :ask Bill if he think it would be good to throw
        // exception  if there isn't result for xpath query 

        it("getValue(xmlDoc, xpath): get result of xpath query in xmlDoc", function(){
            expect(my_app.getValue(my_xml,
                                   "//title/text()"))
                .toEqual(book_title);
        });
        it("** getValue(xmlDoc, xpath): behavior xpath return element", function(){
console.log(my_xml);
            expect(my_app.getValue(my_xml,
                                   "//title"))
                .toEqual(book_title);
        });
        it("** getValue(xmlDoc, xpath): behavior xpath return atribute", function(){
            expect(my_app.getValue(my_xml,
                                   "//@id"))
                .toEqual("1");
        });


        // TODO :ask Bill if he think it would be good to throw
        // exception  if there isn't result for xpath query 
        it("removeXML(xmlDoc, xpath).. remove result of xpath query in xmlDoc   ", function(){
            var my_xml_expected = "<book/>";
            var doc=xml.parse_xml(my_xml);
            my_app.removeXML(doc,"//title");
            expect(xml.serialize_dom(doc)).toEqual(my_xml_expected);
        });
        
        it("** removeXML(xmlDoc, xpath): behavior xpath return attribute   ", function(){
            var my_xml_expected = "<book><title>Harry Potter</title></book>";
            var doc=xml.parse_xml(my_xml);
            my_app.removeXML(doc,"//@id");
            expect(xml.serialize_dom(doc)).toEqual(my_xml_expected);
        });



        it("extract(xmlDoc, xpath) ... get XML element from xpath query in xmlDoc ", function(){
            var doc=xml.parse_xml(my_xml);
            var xml_fragment=xml.extract(doc,"//title");
            
            expect(xml_fragment.toString()).toEqual(title_xml);
        });

        it("** extract1(xmlDoc, xpath): behavior xpath select ancestor"
           + " from attribute return node ancestor   ", function(){
               var my_xml = "<book><title id='1'>Harry Potter</title></book>";
               var my_xml_expected = "<title id=\"1\">Harry Potter</title>";
               var doc=xml.parse_xml(my_xml);
               var result=xml.extract1(doc,"//title[@id=1]");

               expect(xml.serialize_dom(result)).toEqual(my_xml_expected);
           });


        it("append(xmlElementOrDoc, xmlElement) append the second"
           + " parameter value to  the first parameter value", function(){
               var doc=xml.parse_xml(my_xml);
               var child_to_append="<book><title>new"
                       + " Book</title></book>";
               var doc_child=xml.parse_xml(child_to_append);
               my_app.append(doc, doc_child);
               
               expect(xml.serialize_dom(doc)).toEqual(my_xml+child_to_append);


               
           });

        it("** append(xmlElementOrDoc, xmlElement) append to a node"
           + " without childNodes", function(){
               var my_xml = "<library><book/></library>";

               var doc=xml.parse_xml(my_xml);
               var child_to_append="<chapter>new"
                       + " Book</chapter>";
               var xml_expected = "<library><book>"+child_to_append+"</book></library>";
               var doc_child=xml.parse_xml(child_to_append);
               var fragment=  xml.extract1(doc, "//book");
               my_app.append(fragment, doc_child);
               
               expect(xml.serialize_dom(doc)).toEqual(xml_expected);


               
           });


    });
});

console.log(new Date());




