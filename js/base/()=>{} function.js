

// 事实上 =>箭头函数并不绑定 this，arguments，super(ES6)，抑或 new.target(ES6)。
function arrow() {
    setTimeout(() => {
        console.log("id:", this.id);
    }, 100);
}
function fn() {
    setTimeout(function () {
        console.log("id:", this.id);
    }, 100);
}

arrow.call({ id: 11 })
fn.call({ id: 12 })

console.log('-----')
function arrowBind() {
    let id = '222'
    setTimeout((() => {
        console.log("id:", this.id);
    }).bind(this), 100);
}
function fnBind() {
    let id = '223'
    setTimeout(function () {
        console.log("id:", this.id);
    }.bind(this), 100);
}

arrowBind.call({ id: 21 })
fnBind.call({ id: 22 })




