
//若任何一侧是 string 或 object 则两边转换为 string 进行连接
console.log('------- undefined +  Number / String ---------')
var a, b = 3;
var c = a + b;
console.log(c)

console.log('------- {} +  Number / String ---------')
let o = {};
let os = o + '33';
let on = o + 22;
console.log('s:', os);
console.log('n:', on);

console.log('------- { [Symbol.toPrimitive](hint){} } +   Number / String ---------')
o = {
    [Symbol.toPrimitive](hint) {
        console.log('hint', hint)
    }
};
os = o + '33';
on = o + 22;
console.log('s:', os);
console.log('n:', on);

// 按照ES标准规则，hint为default则会依次调用valueOf和toString
console.log('------- {valueOf:()=>{},toString:()=>{}} +  Number / String ---------')

const obj = {
    valueOf() {
        return 12;
    },
    toString() {
        return '21';
    }
}
let s = obj + '33';
let n = obj + 22;
console.log('s:', s);
console.log('n:', n);
