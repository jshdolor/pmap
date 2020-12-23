import ApiClient from '~/Infrastructure/Client/ApiV2Client';
import ExceptionHandler from '~/Infrastructure/Exception/HandlerV2';

export default class SocialMediaService {
    static endpoint = '/auth/social-media';

    static async login() {
        const url = `${this.endpoint}/redirect`;

        return await ApiClient.setUrl(url).get();
    }
}
