
import ToFormData from '~/Infrastructure/FormData';

export default class InquiryRequest extends ToFormData {

    constructor(data = {
    }) {
        super();
        this._name = data.name;
        this._email = data.email;
        this._contact_number = data.phone;
        this._message = data.message;
        this._contact_service = data['service department'];
        this._token = '';
    }

    set token(value) {
        this._token = value;
    }

    get name() {
        return this._name();
    }

    get email() {
        return this._email();
    }

    get phone() {
        return this._phone();
    }

    get message() {
        return this._message();
    }

}