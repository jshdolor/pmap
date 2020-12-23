import ApiClient from '~/Infrastructure/Client/ApiClient';
import ExceptionHandler from '~/Infrastructure/Exception/Handler';


import ToFormData from '~/Infrastructure/FormData';

class NewsLetterServiceRequest extends  ToFormData{
    constructor(data={}){
        super();
        this._email = data.email
    }
}

export default class NewsLetterService {

    static endpoint = '/home_api/subscribe_newsletter';


    static subscribe(request={}) {

        return ApiClient.setUrl(this.endpoint)
            .post(new NewsLetterServiceRequest(request).toFormData(true))
            .then(data => data)
            .catch(e => {
                return new ExceptionHandler('NewsLetterService', e);
            });

    }

    
}