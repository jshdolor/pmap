import ToFormData from '~/Infrastructure/FormData';

export default class CancelReservationRequest extends ToFormData {

    constructor(data = {
    }) {
        super();
        this._code = data.code;
        this._reason = data.reason;
    }


}