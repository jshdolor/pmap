import ApiClient from '~/Infrastructure/Client/ApiV2Client';
import ExceptionHandler from '~/Infrastructure/Exception/HandlerV2';

import CompanyModel from '~/Application/Models/Company';

import CacheManager from '~/Infrastructure/Cache';

export default class CompanyService {
    static endpoint = '/companies';
    static cacheKey = 'company-list';

    static getAll() {
        if (CacheManager.has(this.cacheKey)) {
            return new Promise((resolve) => {
                resolve(CacheManager.get(this.cacheKey));
            });
        }

        return ApiClient.setUrl(this.endpoint)
            .withAuth()
            .get()
            .then(({ data }) => {
                let modeledData = data.map((d) => {
                    return new CompanyModel(d);
                });

                CacheManager.set(this.cacheKey, modeledData);
                return modeledData;
            })
            .catch((e) => new ExceptionHandler('Company Service List', e));
    }

    static get(id) {
        if (CacheManager.has(this.cacheKey + id)) {
            return new Promise((resolve) => {
                resolve(CacheManager.get(this.cacheKey));
            });
        }

        return ApiClient.setUrl(`${this.endpoint}/${id}`)
            .withAuth()
            .get()
            .then(({ data }) => {
                let modeledData = new CompanyModel(data);

                CacheManager.set(this.cacheKey + id, modeledData);
                return modeledData;
            })
            .catch((e) => new ExceptionHandler('Company Service List', e));
    }
}
