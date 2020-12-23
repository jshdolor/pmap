import axios from 'axios';
import { mergeDeep, isEmpty, each } from '~/Framework/Helpers';
import CookieManager from '~/Infrastructure/Cookies';
export default class Http {
    constructor() {
        this.config = {};
    }

    get(url, params = {}, config = {}) {
        this._construct();
        this._prepareXhr(url, 'get', config);
        this.config.params = params;
        return this._send();
    }

    post(url, data = {}, config = {}) {
        this._construct();
        this._prepareXhr(url, 'post', config);
        this.config.data = data;
        return this._send();
    }

    put(url, data = {}, config = {}) {
        this._construct();
        this._prepareXhr(url, 'put', config);
        this.config.data = data;
        return this._send();
    }

    delete(url, data = {}, config = {}) {
        this._construct();
        this._prepareXhr(url, 'delete', config);
        this.config.data = data;
        return this._send();
    }

    _prepareXhr(url, method, config) {
        this.config.url = url;
        this.config.method = method;
        this.overrides = config;
    }

    _construct() {
        this.overrides = {};
        this.config = {
            url: '',
            data: {},
            method: 'get',
            headers: {
                'PMAP-Application': 'frontend-web',
            },
            params: {},
        };
    }

    _send() {
        if (!isEmpty(this.overrides)) {
            this.config = mergeDeep(this.config, this.overrides);
        }

        return axios(this.config).then((response) => {
            if (response) {
                window.axiosResponseHeaders = response.headers;
                return response.data;
            }
        });
    }
}

const intercept = () => {
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (
                !CookieManager.get('fetchingNewAccessToken') &&
                error.response.status === 401 &&
                error.config.url.indexOf('login') === -1 &&
                error.config.url.indexOf('registration') === -1
            ) {
                CookieManager.set('fetchingNewAccessToken', true);

                window.$toasted.info('Reauthenticating.. Please wait..', {
                    position: 'bottom-right',
                });

                const refreshConfig = {
                    url: '/api/v2/refresh',
                    method: 'post',
                    headers: error.config.headers,
                };

                axios(refreshConfig)
                    .then(
                        ({
                            data: {
                                data: { token },
                            },
                        }) => {
                            window.Store.dispatch('session/setAuth', {
                                token_type: 'Bearer',
                                access_token: token,
                            });

                            window.location.reload();
                        }
                    )
                    .catch((e) => CookieManager.delete('p-at'))
                    .finally((e) => {
                        CookieManager.delete('fetchingNewAccessToken');
                    });

                return false;
            }

            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    );
};

intercept();
