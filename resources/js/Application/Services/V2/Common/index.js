import ApiClient from '~/Infrastructure/Client/ApiV2Client';
import ExceptionHandler from '~/Infrastructure/Exception/HandlerV2';

import RegionModel from '~/Application/Models/AddressComponent/Region';
import ProvinceModel from '~/Application/Models/AddressComponent/Province';
import CityModel from '~/Application/Models/AddressComponent/City';
import BarangayModel from '~/Application/Models/AddressComponent/Barangay';

import CacheManager from '~/Infrastructure/Cache';

export default class CommonService {

    static endpoint = '/common/address';

    static regions() {

        const url = `${this.endpoint}/regions`;
        const cacheKey = 'address-regions'

        if(CacheManager.has(cacheKey)) {
            return new Promise((res, rej) => {
                res(CacheManager.get(cacheKey));
            }) 
        }

        return ApiClient.setUrl(url).get()
            .then(({data}) => {
                
                let regions = data.map(d => new RegionModel(d));
                CacheManager.set(cacheKey, regions);

                return regions;
            })
            .catch(e => {
                new ExceptionHandler('CommonService - address:regions',e);
                return [];
            });
    }

    static provinces(region_code) {

        const url = `${this.endpoint}/provinces`;
        const cacheKey = 'address-province-region_code:' + region_code;

        if(CacheManager.has(cacheKey)) {
            return new Promise((res, rej) => {
                res(CacheManager.get(cacheKey));
            }) 
        }

        return ApiClient.setUrl(url).get({region_code})
            .then(({data}) => {
                
                let provinces = data.map(d => new ProvinceModel(d));
                CacheManager.set(cacheKey, provinces);

                return provinces;
            })
            .catch(e => {
                new ExceptionHandler('CommonService - address:province',e);
                return [];
            });
    }

    static cities(province_code) {

        const url = `${this.endpoint}/cities`;
        const cacheKey = 'address-cities-province_code:' + province_code;

        if(CacheManager.has(cacheKey)) {
            return new Promise((res, rej) => {
                res(CacheManager.get(cacheKey));
            }) 
        }

        return ApiClient.setUrl(url).get({province_code})
            .then(({data}) => {
                
                let cities = data.map(d => new CityModel(d));
                CacheManager.set(cacheKey, cities);

                return cities;
            })
            .catch(e => {
                new ExceptionHandler('CommonService - address:cities',e)
                return [];
            });
    }

    static barangays(city_code) {

        const url = `${this.endpoint}/barangays`;
        const cacheKey = 'address-brgy-city_code:' + city_code;

        if(CacheManager.has(cacheKey)) {
            return new Promise((res, rej) => {
                res(CacheManager.get(cacheKey));
            }) 
        }

        return ApiClient.setUrl(url).get({city_code})
            .then(({data}) => {
                
                let provinces = data.map(d => new BarangayModel(d));
                CacheManager.set(cacheKey, provinces);

                return provinces;
            })
            .catch(e => {
                new ExceptionHandler('CommonService - address:brgy',e)
                return [];
            });
    }
}