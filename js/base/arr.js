function solution(inputData) {
    // Click HELP above to see examples of handling input/debug/output 
    // INPUT: var n = parseInt(inputData.split("\n")[0]); 
    // DEBUG: console.log(n); 
    // OUTPUT: process.stdout.write("" + result + "\n"); 

    // Write the code to solve the problem below, 
    // format the "result" as specified in the problem statement 
    // and finally, write the result to stdout 
    // IMPORTANT: Remove all debug statements for final submission 
    if (inputData && inputData instanceof Array) {
        let inputs = inputData;

        const loop = (input) => {
            let res = [];
            for (let i = 0; i < input.length; i++) {
                let arr = JSON.parse(JSON.stringify(input));
                let ele = arr.splice(i, 1);
                res.push(ele);
                if (arr.length) {
                    let sub = loop(arr);
                    res = [...res, ...sub];
                }
            }
            return res;
        }
        return loop(inputs)
    }
}

var l = [1, 2, 4];
let r = solution(l);
console.log(r);