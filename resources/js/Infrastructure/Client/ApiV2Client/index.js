import Http from "~/Infrastructure/Client/Http";

export default class ApiV2Client {
    static url = "";
    static API_BASE = "/api/v2";
    static options = {}

    static withAuth() {
        this.options = {
            headers: {
                Authorization: window.Store.state.session.accessToken,
            }
        }
        return ApiV2Client;
    }

    static setUrl(url) {
        this.url = this.API_BASE + url;
        return ApiV2Client;
    }

    static post(data, options = {}) {
        let http = new Http();
        options = {...this.options, ...options};
        return http.post(this.url, data, options);
    }

    static put(data, options = {}) {
        let http = new Http();
        options = {...this.options, ...options};
        return http.put(this.url, data, options);
    }

    static get(params, options = {}) {
        let http = new Http();
        options = {...this.options, ...options};
        return http.get(this.url, params, options);
    }
}
