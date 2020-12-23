export default class Province {
    constructor(data={}) {
        this._id = data.provCode;
        this._name = data.name;
    }

    get id() {
        return this._id;
    }
    
    get name() {
        return this._name;
    }

}