let p1 = new Promise((res, rej) => {
    res(1);
});
let p2 = new Promise((res, rej) => {
    res(2);
});
let p3 = new Promise((res, rej) => {
    // rej(1);
    // throw ('falt')
    rej(44);
});

Promise.all([p1, p2, p3])
    .then(rs => {
        console.log('success', rs);
    }).catch(e => {
        console.warn('error');
    })