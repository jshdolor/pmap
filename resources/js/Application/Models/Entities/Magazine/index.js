import Config from '~/Application/Config';
import { format } from 'date-fns';

export default class Magazine {
    constructor(data = {}) {
        this._id = data.id;
        this._title = data.title;
        this._image = data.image;
        this._publishedDate = format(
            new Date(data.date_published),
            Config.date.format
        );

        this._author = data.author;
        this._description = data.description;
        this._content = data.content;
    }

    get id() {
        return this._id;
    }

    get description() {
        return this._description;
    }

    get title() {
        return this._title;
    }

    get content() {
        return this._content;
    }

    get image() {
        return `/storage/${this._image}`;
    }

    get publishedDate() {
        return this._publishedDate;
    }

    get path() {
        return `/pmm/${this._id}`;
    }
}
