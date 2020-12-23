import { format } from 'date-fns';
import Config from '~/Application/Config';
export default class Event {
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

        this._isEarlyBird = data.is_early_bird;
        this._memberRegPrice = data.member_regular_price;
        this._nonMemberRegPrice = data.nonmember_regular_price;
        this._memberEarlyPrice = data.member_early_price;
        this._nonMemberEarlyPrice = data.nonmember_early_price;

        this._category = data.category_events_id;

        this._points = data.points;
    }

    get points() {
        return this._points;
    }

    get serverSideUrl() {
        return `${location.origin}/server/event/${this._slug}`;
    }

    get isEarlyBird() {
        return this._isEarlyBird;
    }

    get memberRegPrice() {
        return this._memberRegPrice;
    }

    get nonMemberPrice() {
        return this._isEarlyBird
            ? this._nonMemberEarlyPrice
            : this._nonMemberRegPrice;
    }

    get memberPrice() {
        return this._isEarlyBird
            ? this._memberEarlyPrice
            : this._memberRegPrice;
    }

    get nonMemberRegPrice() {
        return this._nonMemberRegPrice;
    }

    get memberEarlyPrice() {
        return this._memberEarlyPrice;
    }

    get nonMemberEarlyPrice() {
        return this._nonMemberEarlyPrice;
    }

    get category() {
        return this._category;
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
        return this._title;
    }

    get eventDate() {
        return format(new Date(this._eventDate), Config.date.format);
    }

    get eventTime() {
        return format(new Date(this._eventDate), Config.timeFormat);
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
        return this._venue || '';
    }

    get slotsLeft() {
        return (
            parseInt(this._seatingCapacity) - parseInt(this._participants || 0)
        );
    }

    set price(value = {}) {
        this._price = value;
    }

    get price() {
        return this._price;
    }

    get path() {
        return `events/${this._id}`;
    }
}
