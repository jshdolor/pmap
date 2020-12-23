import CookieManager from '~/Infrastructure/Cookies';

export default {

    setAuth(state, data) {
        CookieManager.set('p-at', data.access_token || '');
        // CookieManager.set('p-usr', data.user || '');
        CookieManager.set('p-tt', data.token_type|| '');

        if(!data.access_token) {
            // state.user = null;
            state.accessToken = null;
            state.isLoggedIn = false;
        } else {
            // state.user = CookieManager.get('p-usr'),
            state.accessToken= `${CookieManager.get('p-tt')} ${CookieManager.get('p-at')}`,
            state.isLoggedIn= !!(CookieManager.get('p-at'))
        }
    }

    

};