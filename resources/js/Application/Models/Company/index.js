import { titleCase } from '~/Framework/Helpers/String';

export default class Company {
    constructor(data = {}) {
        this._id = data.id;
        this._name = data.name;
        this._address = data.address;
        this._TIN = data.TIN;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get address() {
        return this._address;
    }

    get TIN() {
        return this._TIN;
    }
}
