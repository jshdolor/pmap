export default class Banner {
    
    constructor(data = {}) {
        this._id = data.id;
        this._title = data.title;
        this._description = data.description;
        this._image = data.image;
        this._url = data.url;
        this._createdAt = data.created_at;
        this._updatedAt = data.updated_at;
    }

    get title() {
        return this._title;
    }

    get description() {
        return this._description;
    }

    get image() {
        return '/storage/' + this._image;
    }

    get url() {
        return this._url;
    }

}