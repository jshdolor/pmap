import ToFormData from '~/Infrastructure/FormData';

export default class ForgotPasswordRequest extends ToFormData {

    constructor(data = {
    }) {
        super();
        this._email = data.email;
    }

    get email () {
        return this._email;
    }

}