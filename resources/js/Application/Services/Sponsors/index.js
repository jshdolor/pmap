import ApiClient from '~/Infrastructure/Client/ApiClient';
import ExceptionHandler from '~/Infrastructure/Exception/Handler';
import SponsorModel from '~/Application/Models/Sponsor';
import CacheManager from '~/Infrastructure/Cache';


export default class SponsorService {

    static endpoint = '/home_api/get_sponsors';

    static getAll() {

        let cacheKey = 'Sponsor';

        if(CacheManager.has(cacheKey)) {
            return new Promise(resolve => {
                resolve(CacheManager.get(cacheKey));
            })
        }


        return ApiClient.setUrl(this.endpoint).get()
            .then(({data}) => {

                let Sponsors =  data.map(d => new SponsorModel(d));
                CacheManager.set(cacheKey, Sponsors);
                return Sponsors;
            })
            .catch(e => new ExceptionHandler('Sponsors',e));
    }
}