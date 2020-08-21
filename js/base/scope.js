var b;
void function () {
    var env = { b: 1 };
    b = 2;
    console.log("In function b:", b);
    with (env) {
        console.log("In with b = :", b);
        var b = 3;
        console.log("In with b:", b);
    }
    console.log("In function b 2:", b);
}();

console.log("Global b:", b);