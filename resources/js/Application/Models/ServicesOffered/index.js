export default class ServicesOffered {
    
    constructor(data = {}) {
        this._id = data.id;
        this._title = data.title;
        this._image = data.image;
        this._icon = data.icon;
        this._description = data.description;
        this._shortDescription = data.short_description;
        this._url = data.url;

        this._createdAt = data.created_at;
        this._updatedAt = data.updated_at;
    }

    get id() {
        return this._id;
    }

    get title() {
        return this._title;
    }

    get url() {
        return this._url;
    }

    get image() {
        return '/storage/' + this._image;
    }

    get description() {
        return this._description;
    }

    get shortDescription() {
        return this._shortDescription;
    }

    get icon() {
        return this._icon;
    }

}