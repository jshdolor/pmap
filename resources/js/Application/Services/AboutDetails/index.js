
import ApiClient from '~/Infrastructure/Client/ApiClient';
import ExceptionHandler from '~/Infrastructure/Exception/Handler';
import AboutDetailsModel from '~/Application/Models/AboutDetails';

import CacheManager from '~/Infrastructure/Cache';

export default class AboutDetailsService {

    static endpoint = '/home_api';
    static cacheKey = 'about-details-list';

    static getAll() {

        if(CacheManager.has(this.cacheKey)) {
            return new Promise((res, rej) => {
                res(CacheManager.get(this.cacheKey));
            }) 
        }

        let url = this.endpoint + '/get_aboutdetails'
        window.pageCallDone[this.cacheKey] = false;


        return ApiClient.setUrl(url).get()
            .then(({data}) => {
                let aboutDetails = data.map(d => new AboutDetailsModel(d));
                CacheManager.set(this.cacheKey, aboutDetails);
                return aboutDetails;

            })
            .catch(e => new ExceptionHandler('Banner',e)).finally(() => {
                window.pageCallDone[this.cacheKey] = true;

            })
    }
}