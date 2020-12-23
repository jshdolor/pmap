
import { format } from 'date-fns';
import Config from '~/Application/Config';

export default class UserEvent {
    constructor(data = {}) {

        this._id = data.id;

        this._eventTitle = data.event.title;
        this._eventId = data.event.id;
        this._eventDate = data.event.event_date;
        this._eventVenue = data.event.venue;

		this._participants = data.participants || [];

		this._registrant = data.registrant;
        this._amount = data.total_amount;
        this._code = data.code;
        this._status = data.status;
        this._createdAt = data.created_at;
		this._registrantPrice = data.registrant_price;
		if(data.price) {
			this._paymentLink = data.price.payment_link;
		}

		if(data.event) {
			this._memberPaymentLink = data.event.paypal;
		}
	}
	
	get registrant() {
		return this._registrant;
	}

	get paymentLink() {
		return this._paymentLink;
	}




	//TEMPORARYYYY
	get nonMemberPaymentLink() {
		return this._paymentLink;
	}
	//TEMPORARYYYY
	get memberPaymentLink() {
		return this._memberPaymentLink;
	}


	



	get registrantPrice() {
		return this._registrantPrice;
	}

	get eventTitle() {
		return this._eventTitle;
	}

	get eventVenue() {
		return this._eventVenue;
	}

	get participants() {
		return JSON.parse(this._participants);
	}

	get eventId() {
		return this._eventId;
	}

	get eventDate() {
		return format(new Date(this._eventDate), Config.date.format );
	}

	get eventTime() {
		return format(new Date(this._eventDate), Config.timeFormat);
	}

	get amount() {
		return this._amount;
	}

	get code() {
		return this._code;
	}

	get status() {
		return this._status;
	}

	get createdAt() {
		return this._createdAt;
	}


}