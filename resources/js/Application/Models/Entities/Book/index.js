import Config from '~/Application/Config';
import { format } from 'date-fns';

export default class Book {
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

        this._memberPaymentLink = data.member_payment_link;
        this._memberPrice = (data.member_price || 0).toFixed(2);
        this._nonmemberPaymentLink = data.nonmember_payment_link;
        this._nonmemberPrice = (data.nonmember_price || 0).toFixed(2);

        this._categories = data.categories;
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

    get image() {
        return `/storage/${this._image}`;
    }

    get publishedDate() {
        return this._publishedDate;
    }

    get memberPaymentLink() {
        return this._memberPaymentLink;
    }
    get memberPrice() {
        return this._memberPrice;
    }
    get nonmemberPaymentLink() {
        return this._nonmemberPaymentLink;
    }
    get nonmemberPrice() {
        return this._nonmemberPrice;
    }

    get path() {
        return `/books/${this._id}`;
    }

    get categories() {
        try {
            const cat = JSON.parse(this._categories || '');
            return Object.values(cat);
        } catch (e) {
            return [];
        }
    }
}
