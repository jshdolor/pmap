import ApiClient from '~/Infrastructure/Client/ApiClient';
import ExceptionHandler from '~/Infrastructure/Exception/Handler';
import CompanyModel from '~/Application/Models/Company';

import CacheManager from '~/Infrastructure/Cache';

export default class CompanyService {

    static endpoint = '/company';
    static cacheKey = 'companies-list';


    static getAll() {

        if(CacheManager.has(this.cacheKey)) {
            return new Promise((res, rej) => {
                res(CacheManager.get(this.cacheKey));
            }) 
        }

        return ApiClient.setUrl(this.endpoint).get()
            .then(({data}) => {
                let services = data.map(d => new CompanyModel(d));
                CacheManager.set(this.cacheKey, services);
                return services;
            })
            .catch(e => new ExceptionHandler('Services',e));
    }
}