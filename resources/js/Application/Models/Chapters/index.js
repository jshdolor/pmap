export default class Chapters {
    
    constructor(data = {}) {
        this._id = data.id;
        this._name = data.name;
        this._group = data.grp;
        this._content = data.content;
    }

    get id() {
        return this._id;
    }

    get name () {
        return this._name;
    }

    get group() {
        return this._group;
    }

    get content () {
        return this._content;
    }
}