var APP = {};

function getArrayBuffer(num = 100 * 1000) {
    var uInt8Array = new Uint8Array(new ArrayBuffer(num));
    for (var i = 0; i < num; ++i) {
        // let o = {
        //     id: i,
        //     name: Math.random(),
        //     author: 'none'
        // }; // [0, 2, 4, 6, 8,...]
        // uInt8Array[i] = stringToUintArray(JSON.stringify(o))
        uInt8Array[i] = i;
    }
    return uInt8Array;
}

onmessage = function (e) {
    let cnt = 0;
    if (e.data.cnt) {
        cnt = e.data.cnt;
    }
    let t = new Date().valueOf();
    postMessage({
        time: t,
    });
    let ab = getArrayBuffer(cnt);
    postMessage(ab, [ab.buffer]);
    // postMessage({ type: 'string', data: JSON.stringify(ab) });

};

//close();