import ApiClient from '~/Infrastructure/Client/ApiClient';
import ExceptionHandler from '~/Infrastructure/Exception/Handler';
import ServicesOfferedModel from '~/Application/Models/ServicesOffered';

import CacheManager from '~/Infrastructure/Cache';

export default class ServicesOfferedService {

    static endpoint = '/services';
    static cacheKey = 'services-offered-list';


    static getAll() {

        if(CacheManager.has(this.cacheKey)) {
            return new Promise((res, rej) => {
                res(CacheManager.get(this.cacheKey));
            }) 
        }

        return ApiClient.setUrl(this.endpoint).get()
            .then(({data}) => {
                let services = data.map(d => new ServicesOfferedModel(d));
                CacheManager.set(this.cacheKey, services);
                return services;
            })
            .catch(e => new ExceptionHandler('Services',e));
    }
}