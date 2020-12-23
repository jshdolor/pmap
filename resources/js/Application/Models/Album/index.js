import { format } from 'date-fns';
import Config from '~/Application/Config';

export default class Album {

    
    constructor(data = {}) {
        this._id = data.id;
        this._title = data.title;
        this._image = data.image;
        this._description = data.description;

        this._createdAt = data.created_at;
        this._updatedAt = data.updated_at;
    }

    get title() {
        return this._title;
    }

    get id() {
        return this._id;
    }

    get image() {
        return '/storage/' + this._image;
    }

    get description() {
        return this._description;
    }

    get createdAt() {
        return format(new Date(this._createdAt), Config.date.format);
    }

}