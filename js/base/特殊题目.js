function Foo() {
    getName = function () { console.log(1) };
    return this;
}
Foo.getName = function () { console.log(2) };
Foo.prototype.getName = function () { console.log(3) };
var getName = function () { console.log(4) };
function getName() { console.log(5) };

Foo.getName(); // 2
getName(); // 4 getName被重新赋值了
Foo().getName(); //1
getName(); //1
new Foo.getName(); //2
new Foo().getName(); //3
new new Foo().getName(); //1

// 因此上面的代码编译后如下(函数声明的优先级先于变量声明):
// function Foo() {
//     getName = function() {console.log(1)};
//     return this;
// }
// function getName() {console.log(5)}; //函数优先(函数首先被提升)
// var getName;//重复声明，被忽略
// Foo.getName = function() {console.log(2)};
// Foo.prototype.getName = function() {console.log(3)};
// getName = function() {console.log(4)};

