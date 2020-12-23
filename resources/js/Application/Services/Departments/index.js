import ApiClient from '~/Infrastructure/Client/ApiClient';
import ExceptionHandler from '~/Infrastructure/Exception/Handler';
import DepartmentModel from '~/Application/Models/Department';

import CacheManager from '~/Infrastructure/Cache';

export default class DepartmentsService {

    static endpoint = '/home_api';
    static cacheKey = 'departments-services-list';

    static getAll() {

        if(CacheManager.has(this.cacheKey)) {
            return new Promise((res, rej) => {
                res(CacheManager.get(this.cacheKey));
            }) 
        }

        let url = this.endpoint + '/get_contact_services';

        return ApiClient.setUrl(url).get()
            .then(({data}) => {
                let departments = data.map(d => new DepartmentModel(d));
                CacheManager.set(this.cacheKey, departments);
                return departments;

            })
            .catch(e => new ExceptionHandler('DepartmentService',e));
    }
}