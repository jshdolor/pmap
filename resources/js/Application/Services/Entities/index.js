import ApiClient from '~/Infrastructure/Client/ApiV2Client';
import ExceptionHandler from '~/Infrastructure/Exception/HandlerV2';
import CacheManager from '~/Infrastructure/Cache';

export default class ResourceService {
    static getAll(entity, EntityModel) {
        const cacheKey = `entities-${entity}`;
        const endpoint = `/entities/${entity}`;

        if (CacheManager.has(cacheKey)) {
            return new Promise((resolve) => {
                resolve(CacheManager.get(cacheKey));
            });
        }

        return ApiClient.setUrl(endpoint)
            .withAuth()
            .get()
            .then(({ data }) => {
                let modeledData = data.map((d) => {
                    return new EntityModel(d);
                });

                CacheManager.set(cacheKey, modeledData);
                return modeledData;
            })
            .catch((e) => new ExceptionHandler(`ResourceService:${entity}`, e));
    }
}
