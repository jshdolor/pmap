import ToFormData from '~/Infrastructure/FormData';

export default class SetNewPasswordRequest extends ToFormData {

    constructor(data = {
    }) {
        super();
        this._token = data.token;
        this._password = data.password;
    }

    get token () {
        return this._token;
    }

    get password () {
        return this._password;
    }

}