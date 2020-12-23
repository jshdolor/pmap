import ApiClient from '~/Infrastructure/Client/ApiClient';
import ExceptionHandler from '~/Infrastructure/Exception/Handler';
import PageModel from '~/Application/Models/Page';
import CacheManager from '~/Infrastructure/Cache';


export default class PageService {

    static endpoint = '/page';

    static get(slug = "") {

        let cacheKey = 'page-' + slug;

        if(CacheManager.has(cacheKey)) {
            return new Promise(resolve => {
                resolve(CacheManager.get(cacheKey));
            })
        }

        let url = `${this.endpoint}/${slug}`;

        window.pageCallDone[cacheKey] = false;

        return ApiClient.setUrl(url).get()
            .then(({data}) => {

                let page =  new PageModel(data);
                CacheManager.set(cacheKey, page);
                return page;
            })
            .catch(e => new ExceptionHandler('Page',e))
            .finally(() => {
                window.pageCallDone[cacheKey] = true;
            });
    }
}