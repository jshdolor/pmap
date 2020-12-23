import Participant from "~/Application/Models/Participant";
import Event from "~/Application/Models/Event";

export default class EventReservation {
    constructor(data = {}) {
        this._status = data.status;
        this._code = data.code;
        this._totalPrice = data.total_price;
        this._participants = data.participants.map(p => new Participant(p));

        this._event = data.event instanceof Event? this._event: new Event(data.event);
    }

    get isPaid() {
        return this._status === 'PAID';
    }

    get status() {
        return this._status;
    }

    get code() {
        return this._code;
    }

    get totalPrice() {
        return this._totalPrice;
    }

    get participants() {
        return this._participants;
    }

    get event() {
        return this._event;
    }

}