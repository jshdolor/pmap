import ApiClient from '~/Infrastructure/Client/ApiClient';
import ExceptionHandler from '~/Infrastructure/Exception/Handler';
import HrNewsModel from '~/Application/Models/HrNews';

import CacheManager from '~/Infrastructure/Cache';

export default class HrNewsService {
    

    static endpoint = '/hrnews_api';
    static cacheKey = 'hr_news';

    static getAll() {

        let url = this.endpoint + '/get_all';
        
        if(CacheManager.has(this.cacheKey)) {
            return new Promise((resolve) => { resolve(CacheManager.get(this.cacheKey))}   );
        }
        
        return ApiClient.setUrl(url).get()
            .then(({data}) => {
                
                let modeledData = data.map(d => {
                    return new HrNewsModel(d);
                });

                CacheManager.set(this.cacheKey, modeledData);
                return modeledData;

            })
            .catch(e => new ExceptionHandler('HrNewsModel', e));
    }
}