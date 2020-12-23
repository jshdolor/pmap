import ApiClient from '~/Infrastructure/Client/ApiV2Client';
import ExceptionHandler from '~/Infrastructure/Exception/HandlerV2';
import CategoryModel from '~/Application/Models/Event/Category';
import CacheManager from '~/Infrastructure/Cache';
import EventModel from '~/Application/Models/Event';

export default class EventService {
    static endpoint = '/events';

    static events(event_id = '') {
        const cacheKey = `event-item-list${event_id}`;

        if (CacheManager.has(cacheKey)) {
            return new Promise((resolve) => {
                resolve(CacheManager.get(cacheKey));
            });
        }

        return ApiClient.setUrl(`${this.endpoint}/${event_id}`)
            .get()
            .then(({ data }) => {
                let modeledData = event_id
                    ? new EventModel(data)
                    : data.map((d) => new EventModel(d));

                CacheManager.set(this.cacheKey, modeledData);
                return modeledData;
            })
            .catch((e) => new ExceptionHandler('EventGetAll', e));
    }

    static categories() {
        const cacheKey = 'event-categories';
        const url = `${this.endpoint}/categories`;

        if (CacheManager.has(cacheKey)) {
            return new Promise((resolve) => {
                resolve(CacheManager.get(cacheKey));
            });
        }

        return ApiClient.setUrl(url)
            .get()
            .then(({ data }) => {
                let newData = data.map((d) => new CategoryModel(d));
                CacheManager.set(cacheKey, newData);
                return newData;
            })
            .catch((e) => new ExceptionHandler('Page', e));
    }
}
