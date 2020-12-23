import ApiClient from '~/Infrastructure/Client/ApiClient';
import ExceptionHandler from '~/Infrastructure/Exception/Handler';

export default class SettingsService {

    static endpoint = '/settings';

    static get() {

        return ApiClient.setUrl(this.endpoint + '/external-script').get()
            .then(({data}) => {
                return data;
            })
            .catch(e => new ExceptionHandler('Settings',e));
    }
}