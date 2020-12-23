import ApiClient from '~/Infrastructure/Client/ApiV2Client';
import ExceptionHandler from '~/Infrastructure/Exception/HandlerV2';

import MenuModel from '~/Application/Models/Menu';

export default class MenuService {
    
    static endpoint = '/menus';

    static  getMenuById(id) {

        return  ApiClient.setUrl(`${this.endpoint}/${id}`)
            .withAuth()
            .get()
            .then(({data}) => {
                return data.map(d => new MenuModel(d));
            })
            .catch(e => {
                return new ExceptionHandler('MenuService', e)
            });
    }

}