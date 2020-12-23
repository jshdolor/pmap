import ToFormData from '~/Infrastructure/FormData';

export default class UpdatePasswordRequest extends ToFormData {

    constructor(data = {
    }) {
        super();
        this._current_password = data.currentPassword;
        this._password = data.password;
        this._confirm_new_password = data.confirmNewPassword;
    }

    get current_password () {
        return this._current_password;
    }

    get password () {
        return this._password;
    }

    get confirm_new_password () {
        return this._confirm_new_password;
    }

}