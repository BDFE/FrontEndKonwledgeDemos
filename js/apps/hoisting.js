function testScope() {

    var funInner = "Inner";
    funcOut = "outer"; //没有 var 声明，会被自动提升到 全局作用域

    if (true) {
        var ifInner = "Inner if true"; //变量的作用域被自动提升到 testScope fun
        ifOuter = "Outer if true"; //没有 var 声明，会被自动提升到 全局作用域
    }

    if (false) {
        var ifInnerFalse = "Inner if false";//变量的作用域被自动提升到 testScope fun
        ifOuterFalse = "Outer if false"; //可以防止变量的作用域被自动提升
    }

    console.log(funInner); //Inner
    console.log(funcOut); //outer
    console.log(ifInner); //Inner if true
    console.log(ifOuter); //Outer if true
    console.log(ifInnerFalse); //undefined
    // console.log(ifOuterFalse);//ReferenceError: ifOuterFalse is not defined
}
testScope();