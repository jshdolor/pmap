
import ToFormData from '~/Infrastructure/FormData';

export default class LoginRequest extends ToFormData {

    constructor(data = {
    }) {
        super();
        this._email = data.email;
        this._password = data.password;
    }

    get email() {
        return this._email();
    }


    get password() {
        return this._password();
    }

}
