
import CookieManager from '~/Infrastructure/Cookies';


export default {

    // user : CookieManager.get('p-usr'),
    accessToken: `${CookieManager.get('p-tt')} ${CookieManager.get('p-at')}`,
    isLoggedIn: !!(CookieManager.get('p-at')),

};