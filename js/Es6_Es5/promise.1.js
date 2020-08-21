console.log('1')
new Promise((resolve,reject) => {
    console.log('2')
    setTimeout(() => {
        console.log('22')
        resolve('hello')
    })
}).then(v => {
    console.log('3')
})
console.log('4')