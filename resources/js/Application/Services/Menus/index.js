import ApiClient from '~/Infrastructure/Client/ApiClient';
import ExceptionHandler from '~/Infrastructure/Exception/Handler';
import MenuModel from '~/Application/Models/Menu';


export default class MenuService {

    static endpoint = '/home_api';

    static getAll() {

        let url = this.endpoint + '/get_menu_items';

        return ApiClient.setUrl(url).get()
            .then(({data}) => data.map(d => new MenuModel(d)))
            .catch(e => new ExceptionHandler('Menu',e));
    }
}