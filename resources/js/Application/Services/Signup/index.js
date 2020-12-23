import ApiClient from '~/Infrastructure/Client/ApiV2Client';
import ExceptionHandler from '~/Infrastructure/Exception/HandlerV2';

import SignUpModel from '~/Application/Models/Signup';

export default class SignupService {

    static endpoint = '/registration';

    static handle(request) {

        return ApiClient.setUrl(this.endpoint)
            .post(request.toFormData())
            .then(({data}) => new SignUpModel(data))
            .catch(e => {
                return  new ExceptionHandler('Signup', e);
            });

    }

}