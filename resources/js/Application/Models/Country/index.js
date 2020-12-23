export default class Country {
    
    constructor(data = {}) {
        this._id = data.id;
        this._name = data.name;
        this._code = data.code;
    }

    get id() {
        return this._id;
    }

    get name () {
        return this._name;
    }

    get code() {
        return this._code;
    }
}