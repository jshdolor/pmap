import ApiClient from '~/Infrastructure/Client/ApiClient';
import ExceptionHandler from '~/Infrastructure/Exception/Handler';
import BannerModel from '~/Application/Models/Banner';

import CacheManager from '~/Infrastructure/Cache';

export default class BannerService {

    static endpoint = '/home_api';
    static cacheKey = 'banners-list';

    static getAll() {

        if(CacheManager.has(this.cacheKey)) {
            return new Promise((res, rej) => {
                res(CacheManager.get(this.cacheKey));
            }) 
        }

        let url = this.endpoint + '/get_banners'


        return ApiClient.setUrl(url).get()
            .then(({data}) => {
                let banners = data.map(d => new BannerModel(d));
                CacheManager.set(this.cacheKey, banners);
                return banners;

            })
            .catch(e => new ExceptionHandler('Banner',e))
            .finally(() => {

            })
    }
}