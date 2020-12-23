import CookieManager from '~/Infrastructure/Cookies';

export default {

    setProfile(state, data) {
        state.profile = data;
    },

    setAvatar(state, data) {
        state.profile = Object.assign(state.profile, {
            avatar: data
        });
    }

    

};