import ApiClient from '~/Infrastructure/Client/ApiClient';
import ExceptionHandler from '~/Infrastructure/Exception/Handler';
import CountryModel from '~/Application/Models/Country';

import CacheManager from '~/Infrastructure/Cache';


export default class CountriesService {

    static endpoint = '/home_api';
    static cacheKey = 'countries-list';

    static getAll() {

        if(CacheManager.has(this.cacheKey)) {
            return new Promise((res, rej) => {
                res(CacheManager.get(this.cacheKey));
            }) 
        }

        let url = this.endpoint + '/get_countries';

        return ApiClient.setUrl(url).get()
            .then(({data}) => {
                let countries = data.map(d => new CountryModel(d));
                CacheManager.set(this.cacheKey, countries);
                return countries;
            })
            .catch(e => new ExceptionHandler('CountriesService',e));
    }
}