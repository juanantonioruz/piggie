var my_cljs_lib=require("../src/cljs-demo/hello");

describe("A suite", function() {
  it("description", function() {
    expect(my_cljs_lib.juan.greeting("juan")).toEqual("welcome juan");
    expect(true).toBe(true);
  });
});

