var util=require("./test_util.js");//console.log(require("./../compiled.js").ideate.ideate.list_dir());
var compiled=require("./../compiled.js");
console.log("Exploring the cljs map file ...");
console.log(compiled);
var ideate =compiled.ideate.ideate;
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
    
    

    
    
});

console.log(new Date());




