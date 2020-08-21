function sortBy(list, cols) {
    list.sort((a, b) => {
        let flag = 0;
        let k1 = cols[1];
        if (k1) {
            if (a[k1] > b[k1]) {
                flag = 1;
            } else if (a[k1] == b[k1]) {
                let k2 = cols[2];
                if (k2 && a[k2] > b[k2]) {
                    flag = 1;
                }
            }else if(a[k1] < b[k1]){
                flag=-1;
            }
        }
        return flag
    });
}
var list = [
    { col1: 2, col2: 10 },
    { col1: 2, col2: 20 },
    { col1: 1, col2: 90 },
    { col1: 1, col2: 10 },
    { col1: 1, col2: 10 },
    { col1: 3, col2: 10 },
    { col1: 3, col2: 20 },
    { col1: 1, col2: 60 },
    { col1: 1, col2: 20 },
    { col1: 1, col2: 50 },
    { col1: 1, col2: 40 }
]
sortBy(list, ['col1', 'col2']);
console.log('list', list);

