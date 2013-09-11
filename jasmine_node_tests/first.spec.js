var compiled=require("./../compiled.js");
console.log("Exploring the cljs map file ...");
console.log(compiled);
var ideate =compiled.ideate.ideate;
describe("A suite", function() {
    it("description", function() {
        var r=compiled.foo.clj_to_js(ideate.list_dir("./"));

        expect(r).toContain("index.html");

        expect(true).toBe(true);

    });
});





