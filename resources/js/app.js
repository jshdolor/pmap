import Vue from 'vue';
import axios from 'axios';
import Boot from '~/Framework/Bootstrap';

import { VueReCaptcha } from 'vue-recaptcha-v3';
import Config from '~/Application/Config';

import { isMobile } from 'mobile-device-detect';
import Toasted from 'vue-toasted';

window.GlobalEvent = new Vue();

Vue.use(Toasted);
Vue.use(VueReCaptcha, { siteKey: Config.googleRecaptchaSiteKey });

window.Vue = Vue;
window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.App = new Boot();

document.querySelector('body').className += isMobile ? 'mobile-device' : '';

window.addEventListener('load', function() {
    App.init();
});