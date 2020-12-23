import ApiClient from '~/Infrastructure/Client/ApiV2Client';
import ExceptionHandler from '~/Infrastructure/Exception/HandlerV2';
import UserModel from '~/Application/Models/Profile';
import CacheManager from '~/Infrastructure/Cache';

export default class UserService {
    static endpoint = '/users';

    static memberSearch(term) {
        
        const url = `${this.endpoint}/search`;

        // const cacheKey = `user-search-${term}`;

        // if (CacheManager.has(cacheKey)) {
        //     return new Promise((resolve) => {
        //         resolve(CacheManager.get(cacheKey));
        //     });
        // }

        return ApiClient.setUrl(url)
            .withAuth()
            .get({term})
            .then(({ data }) => {

                const modeledData =  data.map((d) => new UserModel(d));
                // CacheManager.set(cacheKey, modeledData);
                return modeledData;

            })
            .catch((e) => new ExceptionHandler('User Search', e));
    }
}
