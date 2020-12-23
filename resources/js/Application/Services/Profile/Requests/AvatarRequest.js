
import ToFormData from '~/Infrastructure/FormData';

export default class AvatarRequest extends ToFormData {

    constructor(data = {
    }) {
        super();
        this._avatar = data.avatar;
    }

    set avatar(value) {
        this._avatar = value;
    }

}
