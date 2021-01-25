class DB {
    machines = [];
    
    add(data) {
        return new Promise((resolve) => {
            this.machines.push(data);
            resolve(this.machines);
        });
    }

    findOne(key, value) {
        return new Promise((resolve) => {
            const one = this.machines.find(m => m[key] === value);
            resolve(one);
        });
    }

    find() {
        return new Promise((resolve) => {
            resolve(this.machines);
        });
    }

    findAll(macA) {
        return new Promise((resolve) => {
            const all = this.machines.filter(m => m.macA === macA);
            resolve(all);
        });
    }
}

module.exports = DB;