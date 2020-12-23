
import ToFormData from '~/Infrastructure/FormData';

export default class SignupRequest extends ToFormData {

    constructor(data = {
    }) {
        super();
        this._email = data.email;
        this._password = data.password;
        this._name = data.name;
        this._password_confirmation = data.confirm_password;
    }

    get email() {
        return this._email;
    }


    get password() {
        return this._password;
    }

    get confirmPassword() {
        return this._password_confirmation;
    }

    get name() {
        return this._name;
    }

}
