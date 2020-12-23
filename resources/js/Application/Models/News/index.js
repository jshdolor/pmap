import { format } from 'date-fns';
import Config from '~/Application/Config';

export default class News {

    constructor(data = {}) {
        this._id = data.id;
        this._author = data.author;
        this._category_id = data.category_id;
        this._title = data.title;
        this._seo_title = data.seo_title;
        this._excerpt = data.excerpt;
        this._body = data.body;
        this._image = data.image;
        this._slug = data.slug;
        this._meta_description = data.meta_description;
        this._metaKeywords = data.meta_keywords;
        this._featured = data.featured;
        this._created_at = data.created_at;
        this._updated_at = data.updated_at;
    }

    get id() {
        return this._id;
    }

    get title () {
        return this._title;
    }

    get image() {
        return '/storage/' + this._image;
    }

    get body() {
        return this._body;
    }

    get featured() {
        return !! this._featured;
    }

    get author() {
        return this._author;
    }

    get metaKeywords() {
        return this._metaKeywords? this._metaKeywords.split(',') : [];
    }

    get createdAt() {
        return format(new Date(this._created_at), Config.date.format);
    }

}