import ApiClient from '~/Infrastructure/Client/ApiClient';
import ExceptionHandler from '~/Infrastructure/Exception/Handler';
import EventModel from '~/Application/Models/Event';
import EventPriceModel from '~/Application/Models/Event/EventPrice';

import UserRegEventModel  from '~/Application/Models/Event/UserEvent';

import CacheManager from '~/Infrastructure/Cache';
class EventService {

    static endpoint = '/events_api';
    static cacheKey = 'events';

    static getAll() {

        let url = this.endpoint + '/get_all'

        if(CacheManager.has(this.cacheKey)) {
            return new Promise((resolve) => { resolve(CacheManager.get(this.cacheKey))}   );
        }

        return ApiClient.setUrl(url).get()
            .then(({data}) => {

                let modeledData = data.map(d => new EventModel(d));

                CacheManager.set(this.cacheKey, modeledData)
                return modeledData;
            })
            .catch(e => new ExceptionHandler('EventGetAll',e));
    }

    static get(id='') {

        let url = this.endpoint + `/view_event/${id}`;
        let cachedData = CacheManager.getItem(this.cacheKey, 'id', id);

        if(cachedData) {
            return new Promise((resolve) => {resolve(cachedData)});
        }

        return ApiClient.setUrl(url).get()
            .then(({data}) => {

                let modeledData = new EventModel(data);
                // CacheManager.setItem(this.cacheKey, modeledData);
                return modeledData;

            })
            .catch(e => new ExceptionHandler('EventGet',e));
    }

    static register(request={}) {

        let url = this.endpoint + '/register_event';

        return ApiClient.setUrl(url)
            .post(request.toFormData(true))
            .then(data => data)
            .catch(e => {
                return new ExceptionHandler('register', e);
            });


    }

    static getPrices(id) {
        
        let url = this.endpoint + '/event_prices/' + id;

        return ApiClient.setUrl(url)
            .get()
            .then(({data}) =>  new EventPriceModel(data))
            .catch(e => {
                return new ExceptionHandler('event prices', e);
            });
    }


    static memberSearch(query) {

        let url = this.endpoint + '/search_member/?name=' + encodeURI(query);

        return ApiClient.setUrl(url)
            .get()
            .then(({data}) =>  data)
            .catch(e => {
                return new ExceptionHandler('member search', e);
            });
    }


    static getEventRegistrationByCode(request={}) {

        let url = this.endpoint + '/check_status';

        return ApiClient.setUrl(url)
            .post(request.toFormData())
            .then(({data}) => new UserRegEventModel(data))
            .catch(e => {
                return new ExceptionHandler('EventRegistrationByCode', e);
            });
        
    }

}

export default EventService;
