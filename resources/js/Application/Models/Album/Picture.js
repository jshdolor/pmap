export default class Picture {
    
    constructor(data = {}) {
        this._id = data.id;
        this._albumId = data.album_id;
        this._title = data.title;
        this._path = data.path;
        this._createdAt = data.created_at;
        this._updatedAt = data.updated_at;
    }

    get id() {
        return this._id;
    }

    get title() {
        return this._title;
    }

    get albumId() {
        return this._albumId;
    }

    get path() {
        return '/storage/' + this._path;
    }

}