import ApiClient from '~/Infrastructure/Client/ApiV2Client';
import ExceptionHandler from '~/Infrastructure/Exception/HandlerV2';

import WebinarModel from '~/Application/Models/Entities/Webinar';

import CacheManager from '~/Infrastructure/Cache';

export default class WebinarService {

    static endpoint = '/entities/webinars';
    static cacheKey = "entities-webinars";

    static getAll() {

        if(CacheManager.has(this.cacheKey)) {
            return new Promise((resolve) => { resolve(CacheManager.get(this.cacheKey))}   );
        }
        
        return ApiClient.setUrl(this.endpoint)
            .withAuth()
            .get()
            .then(({data}) => {
                
                let modeledData = data.map(d => {
                    return new WebinarModel(d);
                });

                CacheManager.set(this.cacheKey, modeledData);
                return modeledData;

            })
            .catch(e => new ExceptionHandler('WebinarService', e));
    }

    static downloadFile(id) {
        
        let options = {
            responseType: 'blob'
        };

        return ApiClient.setUrl(this.endpoint + `/${id}/download`)
            .withAuth()
            .get(null, options)
            .then(data =>  data)
            .catch(e => {
                if(e.response.status === 403) {
                    return e;
                }

                new ExceptionHandler('WebinarService-downloadFile', e)
            });

    }

}