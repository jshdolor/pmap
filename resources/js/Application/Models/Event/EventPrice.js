
export default class EventPrice {
    constructor(data = {}) {

        this._id = data.id;
        this._eventId = data.event_id;
        this._nonMemberPrice = data.nonmember_price;
        this._memberPrice = data.member_price;
        this._isEarlyBird = data.is_early_bird;

        this._nonMemberRegPrice = data.nonmember_reg_price;
        this._memberRegPrice = data.member_reg_price;
    }

    get id() {
        return this._id;
    }

    get eventId(){
        return this._eventId;
    }

    get memberPrice() {
        return this._memberPrice;
    }

    get nonMemberPrice() {
        return this._nonMemberPrice;
    }

    get memberRegPrice() {
        return this._memberRegPrice;
    }

    get nonMemberRegPrice() {
        return this._nonMemberRegPrice;
    }

    get isEarlyBird() {
        return this._isEarlyBird;
    }
}