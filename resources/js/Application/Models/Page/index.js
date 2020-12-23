export default class Page {
    
    constructor(data = {}) {
        this._id = data.id;
        this._title = data.title;
        this._body = data.body;
        this._image = data.image;

        this._slug = data.slug;

        this._excerpt = data.excerpt;

        this._createdAt = data.created_at;
        this._updatedAt = data.updated_at;
    }

    get title() {
        return this._title;
    }

    get subTitle() {
        return this._excerpt;
    }

    get content() {
        return this._body;
    }

    get slug() {
        return this._slug;
    }

    get image() {
        return '/storage/' + this._image;
    }

}