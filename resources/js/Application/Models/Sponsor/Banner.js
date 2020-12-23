export default class SponsorBanner {
    
    constructor(data = {}) {
        this._id = data.id;
        this._banner = data.banner;
    }

    get id() {
        return this._id;
    }

    get banner () {
        return '/storage/' + this._banner;
    }
}