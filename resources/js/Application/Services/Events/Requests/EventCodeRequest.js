
import ToFormData from '~/Infrastructure/FormData';

export default class EventCodeRequest extends ToFormData {

    constructor(data = {
    }) {
        super();
        this._code = data.code;
    }

    get code() {
        return this._code;
    }

}
