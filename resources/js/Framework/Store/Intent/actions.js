export default {

    showLoginModal({commit})
    {
        commit('showLoginModal');
    },
    hideLoginModal({commit})
    {
        commit('hideLoginModal');
    },
    showSignupModal({commit})
    {
        commit('showSignupModal');
    },
    hideSignupModal({commit})
    {
        commit('hideSignupModal');
    },
    showGalleryModal({commit})
    {
        commit('showGalleryModal');
    },
    hideGalleryModal({commit})
    {
        commit('hideGalleryModal');
    },
    showForgotPasswordModal({commit})
    {
        commit('showForgotPasswordModal');
    },
    hideForgotPasswordModal({commit})
    {
        commit('hideForgotPasswordModal');
    },

    showGenericModal({commit}, data)
    {
        commit('showGenericModal', data);
    },
    hideGenericModal({commit})
    {
        commit('hideGenericModal');
    },

};