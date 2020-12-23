import ApiClient from '~/Infrastructure/Client/ApiV2Client';
import ExceptionHandler from '~/Infrastructure/Exception/HandlerV2';

import HrDocumentModel from '~/Application/Models/Entities/HrDocument';

import CacheManager from '~/Infrastructure/Cache';

export default class HrDocumentService {

    static endpoint = '/entities/hr-documents';
    static cacheKey = "entities-hr-document";

    static getAll() {

        if(CacheManager.has(this.cacheKey)) {
            return new Promise((resolve) => { resolve(CacheManager.get(this.cacheKey))}   );
        }
        
        return ApiClient.setUrl(this.endpoint)
            .withAuth()
            .get()
            .then(({data}) => {
                
                let modeledData = data.map(d => {
                    return new HrDocumentModel(d);
                });

                CacheManager.set(this.cacheKey, modeledData);
                return modeledData;

            })
            .catch(e => new ExceptionHandler('HrDocumentService', e));
    }
}