export default class Participant {
    constructor(data = {}) {

        this._name = data.name;
        this._email = data.email;
        this._contactNumber = data.contact_number;
        this._companyName = data.company_name;
        this._companyTin = data.company_tin;
        this._companyAddress = data.company_address;
        this._price = data.price;
    }

    get name() {
        return this._name;
    }
    get email() {
        return this._email;
    }
    get contactNumber() {
        return this._contactNumber;
    }
    get companyName() {
        return this._companyName;
    }
    get companyTin() {
        return this._companyTin;
    }
    get companyAddress() {
        return this._companyAddress;
    }
    get price() {
        return this._price;
    }

}