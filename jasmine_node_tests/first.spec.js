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





