import { format } from 'date-fns';
import Config from '~/Application/Config';
export default class HrNews {
    constructor(data = {}) {

        this._id = data.id;
        this._authorId = data.author_id;
        this._title = data.title;
        this._excerpt = data.excerpt;
        this._body = data.body;
        this._image = data.image;
        this._slug = data.slug;
        this._metaDescription = data.meta_description;
        this._metaKeywords = data.meta_keywords;
        this._status = data.status;
        this._eventDate = data.event_date;
        this._createdAt = data.created_at;
        this._updatedAt = data.updated_at;
        this._category = data.category;
        this._endedAt = data.ended_at;
        this._earlyPromoEndedAt = data.early_promo_ended_at;
        this._venue = data.venue;
        this._seatingCapacity = data.seating_capacity;
        this._activeMemPoints = data.active_mem_points;
        this._regularisationPoints = data.regularisation_points;
        this._teaser = data.teaser;
        this._file = data.file;
        this._featured = data.featured;
        this._paypal = data.paypal;
        this._participants = data.participants;
        this._earlyPromoStarted = data.early_promo_started;
        this._price = {};
    }

    get image() {
        return '/storage/' + this._image;
    }

    get body() {
        return this._body;
    }

    get subtitle() {
        return this._excerpt;
    }

    get title() {
        return this._title.replace(/\b[a-z]/g, (x) => x.toUpperCase())
    }

    get eventDate() {
        if(!this._eventDate) {
            return '';
        }
        return format(new Date(this._eventDate), Config.date.format);
    }

    get eventTime() {
        return format(new Date(this._eventDate), Config.timeFormat);
    }

    get createdAtDate() {
        return format(new Date(this._createdAt), Config.date.format);
    }

    get rawEventDate() {
        return this._eventDate;
    }

    get teaser() {
        return this._teaser;
    }

    get id() {
        return this._id;
    }

    get venue() {
        return this._venue || "";
    }

    get slotsLeft() {
        return parseInt(this._seatingCapacity) - parseInt(this._participants || 0);
    }

    get slug() {
        return this._slug;
    }

    set price(value = {})
    {
        this._price = value;
    }

    get price() {
        return this._price;
    }

    get path() {
        return `/hr-news/${this._slug}`;
    }

    
}
