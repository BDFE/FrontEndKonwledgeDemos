// setImmediate()是Node.js v10.0新增的API，任何方法如果你想要异步调用，都建议使用setImmediate()来操作。
// 两者的区别：
//     setImmediate()属于check观察者，其设置的回调函数，会插入到下次事件循环的末尾。
//     process.nextTick()设置的回调函数，会在代码运行完成后立即执行，会在下次事件循环之前被调用，原文是 “the callback will fire as soon as the code runs to completion, but before going back to the event loop.”
//     process.next()所设置的回调函数会存放到数组中，一次性执行所有回调函数。
//     setImmediate()所设置的回调函数会存到到链表中，每次事件循环只执行链表中的一个回调函数。


function testOrder() {
    const test = (i) => {
        setTimeout(function () {
            console.log(`setTimeout(${i})`);
        }, 0);
        setTimeout(function () {
            console.log(`setTimeout-(${i})`);
        }, 0);

        setImmediate(function () {
            console.log(`setImmediate(${i})`);
        });
        setImmediate(function () {
            console.log(`setImmediate-(${i})`);
        });
        process.nextTick(function () {
            console.log(`nextTick(${i})`);
        });
        process.nextTick(function () {
            console.log(`nextTick-(${i})`);
        });
    }
    for (let i = 0; i < 1; i++) {
        test(i);
        // process.next(() => {
        //     console.log(`next(${i})`);
        // })

        // setTimeout(() => {test(i)})
    }
}
testOrder()