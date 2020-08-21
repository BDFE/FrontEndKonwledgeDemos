

name = 'window';
var arrow = () => {
    console.log(this);
}
let obj = null;
obj = {
    name: 'in obj',
    arrow: arrow,
    arrowIn: () => {
        console.log(this);
    },
    arrow2: arrow.bind(obj),
}
obj.arrow3 = arrow.bind(obj);

console.log('--- arrow -----')
arrow();
obj.arrow();
obj.arrowIn();
obj.arrow2();


console.log('--- fn -----')
var fn = function () {
    console.log(this.name);
}

var obj2 = {
    name: 'in obj',
    fn: fn,
    fnIn: function () {
        console.log(this.name);
    },
    fn2: fn.bind(obj2),
}

obj2.fn3 = fn.bind(obj2);

fn();
obj2.fn();
obj2.fnIn();
obj2.fn2();
obj2.fn3();
