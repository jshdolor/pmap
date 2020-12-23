export default class AboutDetails {
    
    constructor(data = {}) {
        this._id = data.id;
        this._name = data.name;
        this._details = data.details;
    }

    get id() {
        return this._id;
    }

    get name () {
        return this._name;
    }

    get details() {
        return this._details;
    }
}