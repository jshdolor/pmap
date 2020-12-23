import ApiClient from '~/Infrastructure/Client/ApiV2Client';
import ExceptionHandler from '~/Infrastructure/Exception/HandlerV2';

export default class ForgotPasswordService {
    

    static endpoint = '/user/forgot-password';

    static sendLink(request={}) {
        return ApiClient.setUrl(this.endpoint)
            .post(request.toFormData())
            .then(data => {
                return data;
            })
            .catch(e => {
                return new ExceptionHandler('ForgotPasswordService - passwordForgetten', e, false)
            });
    }

    static validate(request={}) {

        return ApiClient.setUrl(this.endpoint + '/validate-token')
            .post(request.toFormData())
            .then(({data}) => {
                return data;
            })
            .catch(e => new ExceptionHandler('ForgotPasswordService - isTokenValid', e));
    }

    static setNewPassword(request={}) {

        return ApiClient.setUrl(this.endpoint + '/password-set')
            .post(request.toFormData())
            .then(({data}) => {
                
                return data;

            })
            .catch(e => new ExceptionHandler('ForgotPasswordService - setNewPassword', e));
    }
}