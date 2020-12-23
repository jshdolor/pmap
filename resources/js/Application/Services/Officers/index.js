import ApiClient from '~/Infrastructure/Client/ApiClient';
import ExceptionHandler from '~/Infrastructure/Exception/Handler';
import OfficerModel from '~/Application/Models/Officer';
import CacheManager from '~/Infrastructure/Cache';


export default class OfficersService {

    static endpoint = '/home_api/get_officers';

    static getAll() {

        let cacheKey = 'officers';

        if(CacheManager.has(cacheKey)) {
            return new Promise(resolve => {
                resolve(CacheManager.get(cacheKey));
            })
        }

        return ApiClient.setUrl(this.endpoint).get()
            .then(({data}) => {
                let officers = data.map(d => new OfficerModel(d));
                CacheManager.set(cacheKey, officers);
                return officers;
            })
            .catch(e => new ExceptionHandler('Officers',e));
    }
}