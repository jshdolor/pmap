import ApiClient from '~/Infrastructure/Client/ApiClient';
import ExceptionHandler from '~/Infrastructure/Exception/Handler';
import CategorySponsorModel from '~/Application/Models/CategorySponsor';

import CacheManager from '~/Infrastructure/Cache';

export default class CategorySponsorService {

    static endpoint = '/category-sponsors';
    static cacheKey = 'category-sponsors-list';


    static getAll() {

        if(CacheManager.has(this.cacheKey)) {
            return new Promise((res, rej) => {
                res(CacheManager.get(this.cacheKey));
            }) 
        }

        return ApiClient.setUrl(this.endpoint).get()
            .then(({data}) => {
                let services = data.map(d => new CategorySponsorModel(d));
                CacheManager.set(this.cacheKey, services);
                return services;
            })
            .catch(e => new ExceptionHandler('CategorySponsorService',e));
    }
}