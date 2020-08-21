var p2 = new Promise(function (resolve, reject) {
    // resolve("Success!");
    // or
    reject("Error!");
});

var rp = p2.then(function (value) {
    console.log('p2 success', value); // Success!
    throw ('p2 success throw');
}, function (rejectInfo) {
    console.log('p2 error:', rejectInfo); // Error!
    return ('p2 fail throw');
})
rp.catch(e => {
    console.log('catch', e);
})
