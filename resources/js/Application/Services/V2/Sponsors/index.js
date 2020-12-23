import ApiClient from '~/Infrastructure/Client/ApiClient';
import ExceptionHandler from '~/Infrastructure/Exception/Handler';
import SponsorBannerModel from '~/Application/Models/Sponsor/Banner';
import CacheManager from '~/Infrastructure/Cache';

//TODO: make base class for services
export default class SponsorService {
    static endpoint = '/sponsors';

    static banners() {
        const url = `${this.endpoint}/banners`;

        return ApiClient.setUrl(url)
            .get()
            .then(({ data }) => {
                return data.map((d) => new SponsorBannerModel(d));
            })
            .catch((e) => new ExceptionHandler('Sponsors Banner', e));
    }
}
