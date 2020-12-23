export default class Sponsor {
    
    constructor(data = {}) {
        this._id = data.id;
        this._logo = data.logo;
        this._description = data.description;
        this._sponsorLink = data.sponsor_link;
        this._priority = data.priority;
        this._companyName = data.company_name;
        this._category = data.category;
        this._categoryId = data.category_sponsor_id;
    }

    get id() {
        return this._id;
    }

    get image () {
        return '/storage/' + this._logo;
    }

    get description() {
        return this._description;
    }

    get link() {
        return this._sponsorLink;
    }

    get priority() {
        return this._priority;
    }

    get companyName() {
        return this._companyName;
    }

    get category() {
        return this._category;
    }

    get categoryId() {
        return this._categoryId;
    }
}