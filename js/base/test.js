function isInstance(left, right) {
    let rp = right.prototype;
    let lp = left.__proto__;
    let flag = false;
    const loop = (l, r) => {
        if (l && l == r) {
            flag = true;
        } else if (l && l.__proto__) {
            loop(l.__proto__, r);
        }
    }
    loop(lp,rp);
    return flag;
}
var ar = [];

let ao = isInstance(ar, Object);
let aa = isInstance(ar, Array);
console.log('ao', ao);
console.log('aa', aa);