export default class Region {
    constructor(data={}) {
        this._id = data.regCode;
        this._name = data.name;
    }

    get id() {
        return this._id;
    }
    
    get name() {
        return this._name;
    }

}