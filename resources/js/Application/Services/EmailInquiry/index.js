import ApiClient from '~/Infrastructure/Client/ApiV2Client';

import ExceptionHandler from '~/Infrastructure/Exception/HandlerV2';
import EventModel from '~/Application/Models/Event';


export default class EmailInquiry {

    static endpoint = '/email-inquiry';

    static handle(request) {

        return ApiClient.setUrl(this.endpoint)
            .post(request.toFormData())
            .then(data => data)
            .catch(e => {
                throw new ExceptionHandler('Email Inquiry', e);
            });

    }

}