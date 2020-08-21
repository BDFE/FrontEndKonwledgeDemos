var APP = {};

function request(d){
    for(var fn in d){
    }
}

APP.test = function(prop) {
	console.log('test');
	postMessage({callback: 'message to parent'})
};

onmessage = function(e) {
    console.log('worker receive:',e);
    request(e);
    APP.test();
};

//close();