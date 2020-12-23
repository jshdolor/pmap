export default class City {
    constructor(data={}) {
        this._id = data.citymunCode;
        this._name = data.name;
    }

    get id() {
        return this._id;
    }
    
    get name() {
        return this._name;
    }

}