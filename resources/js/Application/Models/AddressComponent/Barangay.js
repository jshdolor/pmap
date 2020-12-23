export default class Barangay {
    constructor(data={}) {
        this._id = data.brgyCode;
        this._name = data.name;
    }

    get id() {
        return this._id;
    }
    
    get name() {
        return this._name;
    }

}