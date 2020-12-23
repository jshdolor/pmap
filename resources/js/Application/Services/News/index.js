import ApiClient from '~/Infrastructure/Client/ApiClient';
import ExceptionHandler from '~/Infrastructure/Exception/Handler';
import NewsModel from '~/Application/Models/News';

import CacheManager from '~/Infrastructure/Cache';


export default class NewsService {

    static endpoint = '/news';
    static cacheKey = 'news-list';

    static getAll() {

        if(CacheManager.has(this.cacheKey)) {
            return new Promise((res, rej) => {
                res(CacheManager.get(this.cacheKey));
            }) 
        }

        return ApiClient.setUrl(this.endpoint).get()
            .then(({data}) => {
                let news = data.map(d => new NewsModel(d));
                CacheManager.set(this.cacheKey, news);
                return news;
            })
            .catch(e => new ExceptionHandler('NewsService',e));
    }
}