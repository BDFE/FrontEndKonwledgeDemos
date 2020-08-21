
class EventEmitter {
    constructor() {
        this.events = {};
    }
    on(key, cb) {
        let eventKey = Symbol.for(key);
        if (this.events[eventKey]) {
            let ons = this.events[eventKey] && this.events[eventKey].callbacks;
            ons.push(cb);
        } else {
            this.events[eventKey] = {
                callbacks: [cb]
            }
        }
    }
    off(key, cb) {
        let eventKey = Symbol.for(key);
        if (this.events[eventKey]) {
            let ons = this.events[eventKey] && this.events[eventKey].callbacks;
            let pos = ons.indexOf(cb);
            if (pos > -1) {
                ons.splice(pos, 1);
            }
            return true;
        }
        return false;
    }
    emit(key, ...args) {
        let eventKey = Symbol.for(key);
        let ons = this.events[eventKey] && this.events[eventKey].callbacks;
        if (ons && ons.length) {
            for (let i = 0; i < ons.length; i++) {
                let on = ons[i];
                on && on.apply(this, args);
            }
        }
    }

}

let ev = new EventEmitter();
ev.on('name', data => {
    console.log('your name:', data);
})

function hi(data) {
    console.log('hi', data);
}
ev.on('name', hi)
ev.emit('name', 'kong');
console.log('-----');
ev.off('name', data => {
    console.log('your name:', data);
})
ev.off('name', hi)
ev.emit('name', {
    id: 11,
    name: 'daniel'
});
