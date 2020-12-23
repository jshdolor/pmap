import ApiClient from '~/Infrastructure/Client/ApiClient';
import ExceptionHandler from '~/Infrastructure/Exception/Handler';
import PictureModel from '~/Application/Models/Album/Picture';

import CacheManager from '~/Infrastructure/Cache';

export default class PictureService {

    static endpoint = '/home_api';
    static cacheKey = 'albums-pictures';

    static getByAlbum(album_id=null) {

        if(!album_id) {
            throw new ExceptionHandler('No Album Id' );
        }

        let url = this.endpoint + `/get_pictures/${album_id}`;
        
        if(CacheManager.has(`${this.cacheKey}-${album_id}`)) {
            return new Promise((res, rej) => { res(CacheManager.get(`${this.cacheKey}-${album_id}`)) });
        }

        return ApiClient.setUrl(url).get()
            .then(({data}) => {
                
                let modeledData = data.map(d => new PictureModel(d));
                CacheManager.set(`${this.cacheKey}-${album_id}`, modeledData);
                return modeledData;

            })
            .catch(e => new ExceptionHandler('GalleryPicture',e));
    }
}