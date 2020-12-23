import ApiClient from '~/Infrastructure/Client/ApiClient';
import ExceptionHandler from '~/Infrastructure/Exception/Handler';
import AlbumModel from '~/Application/Models/Album';

import CacheManager from '~/Infrastructure/Cache';

export default class GalleryService {

    static endpoint = '/home_api';
    static cacheKey = 'albums';

    static getAll() {

        let url = this.endpoint + '/get_albums';
        
        if(CacheManager.has(this.cacheKey)) {
            return new Promise((resolve) => { resolve(CacheManager.get(this.cacheKey))}   );
        }
        
        return ApiClient.setUrl(url).get()
            .then(({data}) => {
                
                let modeledData = data.map(d => {
                    return new AlbumModel(d);
                });

                CacheManager.set(this.cacheKey, modeledData);
                return modeledData;

            })
            .catch(e => new ExceptionHandler('Gallery',e));
    }
}