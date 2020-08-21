
// 没有 Symbol.toPrimitive 属性的对象
var obj1 = {};
console.log(+obj1);     // NaN
console.log(`${obj1}`); // "[object Object]"
console.log(obj1 + ""); // "[object Object]"


// 在 Symbol.toPrimitive 属性(用作函数值)的帮助下，一个对象可被转换为原始值。
// 该函数由字符串参数 hint 调用，目的是指定原始值转换结果的首选类型。
// hint 参数可以是"number"、"string" 和 "default" 中的一种。


// 拥有 Symbol.toPrimitive 属性的对象
var obj2 = {
    [Symbol.toPrimitive](hint) {
        if (hint == "number") {
            return 10;
        }
        if (hint == "string") {
            return "hello";
        }
        return true;
    }
};
console.log(30 - obj2);     // 10      -- hint is "number"
console.log(`${obj2}`); // "hello" -- hint is "string"
console.log(obj2 + ""); // "true"  -- hint is "default"


console.log('--------a == 1 && a == 2 && a == 3------------- ')
// 14.下面代码a在什么情况中打印出1？
var log = (a) => {
    if (a == 1 && a == 2 && a == 3) {
        console.log(1);
    }
}

let a = {
    [Symbol.toPrimitive]: (function () {
        let i = 1;
        return function () {
            return i++;
        }
    })()
}
log(a);



