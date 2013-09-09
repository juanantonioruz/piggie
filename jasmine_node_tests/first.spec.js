var my_cljs_lib=require("../src/cljs-demo/hello");

describe("A suite", function() {
  it("description", function() {
    expect(my_cljs_lib.juan.greeting("juan")).toEqual("welcome juan");
    expect(my_cljs_lib.cljs_demo.hello.my_function("Bill")).toEqual("hello your name is: Bill");
    expect(true).toBe(true);

  });
});






