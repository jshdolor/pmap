import ApiClient from '~/Infrastructure/Client/ApiClient';
import ExceptionHandler from '~/Infrastructure/Exception/Handler';
import ChaptersModel from '~/Application/Models/Chapters';

import CacheManager from '~/Infrastructure/Cache';

export default class ChaptersService {

    static endpoint = '/home_api';
    static cacheKey = 'chapters-list';

    static getAll() {

        if(CacheManager.has(this.cacheKey)) {
            return new Promise((res, rej) => {
                res(CacheManager.get(this.cacheKey));
            }) 
        }

        let url = this.endpoint + '/get_chapters'
        window.pageCallDone[this.cacheKey] = false;

        return ApiClient.setUrl(url).get()
            .then(({data}) => {
                let chapters = data.map(d => new ChaptersModel(d));
                CacheManager.set(this.cacheKey, chapters);
                return chapters;

            })
            .catch(e => new ExceptionHandler('ChaptersService',e))
            .finally(() => {
                window.pageCallDone[this.cacheKey] = true;

            })
    }
}