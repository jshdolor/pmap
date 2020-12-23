
import ToFormData from '~/Infrastructure/FormData';

export default class RegisterEventRequest extends ToFormData {

    constructor(data = {
    }) {
        super();
        this._event_id = null;
        this._name = data.name;
        this._email = data.email;
        this._company = data.company;
        this._contact = data.contactNumber;
        this._company_address = data.company_address;
        this._company_tin = data.company_tin;
        this._total = data.total;
        this._registrant_price = data.registrantPrice;

        this._participants = [];
    }

    set eventId(value) {
        this._event_id = value;
    }

    set registrantPrice(value) {
        this._registrant_price = value;
    }

    set participants(value=[]) {
        this._participants = value.map(s => {
            return {
                name: s.name,
                contact: s.contactNumber,
                email: s.email,
                company: s.company,
                company_tin: s.company_tin,
                company_address: s.company_address,
                isMember: s.isMember,
                price: s.price
            }
        });

        this._participants = JSON.stringify(this._participants);
    }

    set total(value=0) {
        this._total = value;
    }

    get total() {
        return this._total;
    }

}
