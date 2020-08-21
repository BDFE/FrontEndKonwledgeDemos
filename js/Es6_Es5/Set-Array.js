let arr = [];
let set = new Set();
let n = 1000 * 1000;
for (let i = 0; i < n; i++) {
    arr.push(i);
    set.add(i);
}

// ---------------------测试1：查找元素-------------------
let result;
console.time('Array Find');
result = arr.indexOf(123123) !== -1;
console.timeEnd('Array Find');
console.time('Set Find');
result = set.has(123123);
console.timeEnd('Set Find');

// ---------------------测试2：添加元素-------------------
console.time('Array Add');
arr.push(n);
console.timeEnd('Array Add');
console.time('Set Add');
set.add(n);
console.timeEnd('Set Add');

// ---------------------从数组中删除重复的值-------------------
// 测试3：删除元素
const deleteFromArr = (arr, item) => {
    let index = arr.indexOf(item);
    return index !== -1 && arr.splice(index, 1);
};
console.time('Array Delete');
deleteFromArr(arr, n);
console.timeEnd('Array Delete');
console.time('Set Delete');
set.delete(n);
console.timeEnd('Set Delete');

// ---------------------从数组中删除重复的值-------------------
console.log('从数组中删除重复的值')
let src = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
let list = [];
for (let i = 0; i < 1000 * 1000; i++) {
    list[i] = src[i % 7];
}

// 将数组转换为 
// ---------------------Set - Array 去重 转换-------------------
console.time('List To Set:');
let mySet = new Set(list);
console.timeEnd('List To Set:');
console.log(mySet) // Result: Set(4) {"A", "B", "C", "D"}

console.time('List Distinct:');
let uniq = [...new Set(list)];
console.timeEnd('List Distinct:');
console.log(uniq) // Result: ["A", "B", "C", "D"]

// ---------------------Set entries -------------------

mySet.add("foobar");
mySet.add(1);
mySet.add("baz");
mySet.entries()
console.log('------set entries--------');
var mySetIter = mySet.entries();
console.log(mySetIter); // ["foobar", "foobar"]
console.log(mySetIter.next().value); // ["foobar", "foobar"]
console.log(mySetIter.next().value); // [1, 1]
console.log(mySetIter.next().value); // ["baz", "baz"]
console.log('------set values--------');
for (let item of mySet.values()) console.log(item);

