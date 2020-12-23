import ToFormData from '~/Infrastructure/FormData';

export default class IsValidTokenRequest extends ToFormData {

    constructor(data = {
    }) {
        super();
        this._token = data.token;
    }

    get token () {
        return this._token;
    }

}